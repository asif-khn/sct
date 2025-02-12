const STATIC_CACHE = 'static-v3';
const API_CACHE = 'api-v3';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

// Configure external APIs
const EXTERNAL_APIS = [
  {
    origin: 'https://www.thebluealliance.com',
    endpoints: ['/api/v3/event/'],
    headers: {
      'X-TBA-Auth-Key': 'MCZxxHD0IG2SMFfKU5TbPYrnu9ZxTmOQSHovm4T7nryZo87lZ34CQ9NNYSyUbic2'
    }
  }
];

// Core assets to cache
const STATIC_ASSETS = ['/', '/index.html', '/pit.html',
    '2025/field_image.png','2025/reefscape_config.js','2025\reefscape_pit_scouting.js',
    'resources/css/style.css', 'resources/js/scoutingApp.js', 'resources/js/sw.js',
    'resources/js/easy.qrcode.min.js','resources/js/TBAInterface.js',
    'resources/images/favicon.ico', 'resources/images/field_location_key.png',
    'resources/fonts/alex.woff','resources/fonts/alexisv3.ttf'];

// ==================== Service Worker Lifecycle Events ====================

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== STATIC_CACHE && key !== API_CACHE) {
          return caches.delete(key);
        }
      })
    )).then(() => self.clients.claim())
  );
});

// ==================== Fetch Event Handler ====================

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      handleNavigationRequest(event)
    );
    return;
  }

  // Handle external API requests
  const apiConfig = getApiConfig(url);
  if (apiConfig) {
    event.respondWith(
      handleApiRequest(event, apiConfig)
    );
    return;
  }

  // Handle local asset requests
  event.respondWith(
    handleStaticAssetRequest(event)
  );
});

// ==================== Request Handlers ====================

async function handleNavigationRequest(event) {
  try {
    const networkResponse = await fetch(event.request);
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('/index.html');
    return cachedResponse || Response.error();
  }
}

async function handleStaticAssetRequest(event) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(event.request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(event.request, networkResponse.clone());
        }
      });
    return cachedResponse;
  }
  
  return fetch(event.request);
}

async function handleApiRequest(event, apiConfig) {
  const cache = await caches.open(API_CACHE);
  const cachedResponse = await cache.match(event.request);
  const cacheTime = await getCacheTime(event.request);

  try {
    // Network first strategy with conditional caching
    const networkResponse = await fetch(event.request.clone(), {
      headers: new Headers(apiConfig.headers)
    });

    if (networkResponse.ok) {
      const clonedResponse = networkResponse.clone();
      cache.put(event.request, clonedResponse);
      return networkResponse;
    }
    
    throw new Error('Network response not OK');
    
  } catch (error) {
    // Return cached response if available and not expired
    if (cachedResponse && cacheTime > Date.now() - CACHE_EXPIRATION) {
      return cachedResponse;
    }
    
    // Fallback response if no valid cache
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Cached data unavailable'
    }), {
      headers: {'Content-Type': 'application/json'}
    });
  }
}

// ==================== Helper Functions ====================

function getApiConfig(url) {
  return EXTERNAL_APIS.find(api => 
    url.origin === api.origin &&
    api.endpoints.some(endpoint => url.pathname.startsWith(endpoint))
  );
}

async function getCacheTime(request) {
  const cache = await caches.open(API_CACHE);
  const response = await cache.match(request);
  return response?.headers.get('sw-cache-time') || 0;
}

// ==================== Cache Maintenance ====================

// Regular cache cleanup
setInterval(async () => {
  const cache = await caches.open(API_CACHE);
  const requests = await cache.keys();
  
  requests.forEach(async request => {
    const cacheTime = await getCacheTime(request);
    if (Date.now() - cacheTime > CACHE_EXPIRATION) {
      cache.delete(request);
    }
  });
}, CACHE_EXPIRATION); 
