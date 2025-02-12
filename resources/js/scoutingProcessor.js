/**
 * @function configure
 * @description Configures the scouting application based on JSON configuration
 * @returns {number} 0 on success, -1 on error
 */
function configure() {
    // Cache DOM queries
    const tables = {
        prematch: document.getElementById("prematch_table"),
        auton: document.getElementById("auton_table"),
        teleop: document.getElementById("teleop_table"),
        endgame: document.getElementById("endgame_table"),
        postmatch: document.getElementById("postmatch_table")
    };

    const submitButton = document.getElementById("submit");
    const pageTitles = document.getElementsByClassName("page_title");

    // Parse configuration
    let mydata;
    try {
        mydata = JSON.parse(config_data);
    } catch (err) {
        const errorMessage = `
            <div class="error-message">
                Error parsing configuration file: ${err.message}<br><br>
                Use a tool like <a href="http://jsonlint.com/" target="_blank">http://jsonlint.com/</a> 
                to help you debug your config file
            </div>`;
        
        if (tables.prematch) {
            const row = tables.prematch.insertRow(0);
            row.insertCell(0).innerHTML = errorMessage;
        }
        
        console.error('Configuration Parse Error:', err);
        return -1;
    }

    // Apply configuration using a configuration map
    const configMap = {
        dataFormat: (value) => dataFormat = value,
        title: (value) => document.title = value,
        page_title: (value) => Array.from(pageTitles).forEach(el => el.innerHTML = value),
        pitConfig: (value) => pitScouting = value.toUpperCase() === 'TRUE',
        checkboxAs: (value) => {
            const validFormats = ['YN', 'TF', '10'];
            checkboxAs = validFormats.includes(value) ? value : 'YN';
            if (!validFormats.includes(value)) {
                console.warn(`Unrecognized checkboxAs setting '${value}'. Defaulting to YN.`);
            }
        }
    };

    // Apply configurations
    Object.entries(configMap).forEach(([key, fn]) => {
        if (mydata.hasOwnProperty(key)) {
            fn(mydata[key]);
        }
    });

    // Configure form sections
    const sections = ['prematch', 'auton', 'teleop', 'endgame', 'postmatch'];
    sections.forEach(section => {
        if (mydata[section] && tables[section]) {
            let idx = 0;
            mydata[section].forEach(element => {
                idx = addElement(tables[section], idx, element);
            });
        }
    });

    return 0;
}

/**
 * Helper function to create error display
 * @param {string} message - Error message to display
 * @returns {HTMLElement} Error container element
 */
function createErrorDisplay(message) {
    const container = document.createElement('div');
    container.className = 'error-container';
    container.innerHTML = message;
    return container;
}
