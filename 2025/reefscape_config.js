var config_data = `
{
    "dataFormat": "tsv",
    "title": "Scout App 2025",
    "page_title": "ReefScape",
    "checkboxAs": "10",
    
    "prematch": [
      {
        "name": "Scouter Initials",
        "code": "s",
        "type": "scouter",
        "size": 5,
        "maxSize": 5,
        "required": "true"
      },
      {
        "name": "Event",
        "code": "e",
        "type": "event",
        "defaultValue": "2025milac",
        "required": "true"
      },
      {
        "name": "Match Level",
        "code": "l",
        "type": "level",
        "choices": {
          "qm": "Quals<br>",
          "sf": "Semifinals<br>",
          "f": "Finals"
        },
        "defaultValue": "qm",
        "required": "true"
      },
      {
        "name": "Match #",
        "code": "m",
        "type": "match",
        "min": 1,
        "max": 150,
        "required": "true"
      },
      {
        "name": "Robot",
        "code": "r", 
        "type": "robot",
        "choices": {
          "r1": "Red-1",
          "b1": "Blue-1<br>",
          "r2": "Red-2", 
          "b2": "Blue-2<br>",
          "r3": "Red-3",
          "b3": "Blue-3"
        },
        "required": "true"
      },
      {
        "name": "Team #",
        "code": "t",
        "type": "team",
        "min": 1,
        "max": 99999
        },
    { "name": "Auto Start Position",
      "code": "as",
      "type": "clickable_image",
      "filename": "2025/field_image.png",
      "clickRestriction": "one",
      "allowableResponses": "6 7 18 19 30 31 42 43 54 55 66 67",
      "shape": "circle 3 black red true"
    }
      
    ],
  
    "auton": [
      {
        "name": "Leave Starting Line",
        "code": "al",
        "type": "bool"
      },
      {
        "name": "Coral L1 (Trough)",
        "code": "acl1",
        "type": "counter"
      },
      {
        "name": "Coral L2",
        "code": "acl2", 
        "type": "counter"
      },
      {
        "name": "Coral L3",
        "code": "acl3",
        "type": "counter"
      },
      {
        "name": "Coral L4",
        "code": "acl4",
        "type": "counter"
      },
      {
        "name": "Algae in Processor",
        "code": "aap",
        "type": "counter"
      },
      {
        "name": "Algae in Net",
        "code": "aan",
        "type": "counter"
      },
      { "name": "Auton Path Tracking",
        "code": "apt",
        "type": "clickable_image",
        "filename": "2025/field_image.png",
        "clickRestriction": "",
        "allowableResponses": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72",
        "shape": "circle 3 black blue true"
      }
    ],
  
    "teleop": [
      {
        "name": "Coral L1 (Trough)",
        "code": "tcl1",
        "type": "counter"
      },
      {
        "name": "Coral L2",
        "code": "tcl2",
        "type": "counter"
      },
      {
        "name": "Coral L3", 
        "code": "tcl3",
        "type": "counter"
      },
      {
        "name": "Coral L4",
        "code": "tcl4",
        "type": "counter"
      },
      {
        "name": "Algae in Processor",
        "code": "tap",
        "type": "counter"
      },
      {
        "name": "Algae in Net",
        "code": "tan",
        "type": "counter"
      },
      {
        "name": "Pickup From",
        "code": "tpu",
        "type": "radio",
        "choices": {
          "c": "Coral Station",
          "f": "Field",
          "b": "Both",
          "x": "Not Attempted"
        },
        "defaultValue": "x"
      }
    ],
  
    "endgame": [
      {
        "name": "Final Position",
        "code": "fp",
        "type": "radio",
        "choices": {
          "p": "Parked in Barge Zone",
          "s": "Shallow Cage",
          "d": "Deep Cage",
          "a": "Attempted but Failed",
          "x": "Not Attempted"
        },
        "defaultValue": "x"
      }
    ],
  
    "postmatch": [
      {
        "name": "Driver Skill",
        "code": "ds",
        "type": "radio",
        "choices": {
          "n": "Not Effective<br>",
          "a": "Average<br>", 
          "v": "Very Effective<br>",
          "x": "Not Observed"
        },
        "defaultValue": "x"
      },
      {
        "name": "Defense Rating",
        "code": "dr",
        "type": "radio",
        "choices": {
          "b": "Below Average<br>",
          "a": "Average<br>",
          "g": "Good<br>",
          "e": "Excellent<br>",
          "x": "Did not play defense"
        },
        "defaultValue": "x"
      },
      {
        "name": "Speed Rating",
        "code": "sr",
        "type": "radio", 
        "choices": {
          "1": "1 (slow)<br>",
          "2": "2<br>",
          "3": "3<br>",
          "4": "4<br>",
          "5": "5 (fast)"
        },
        "defaultValue": "3"
      },
      {
        "name": "Died/Immobilized",
        "code": "die",
        "type": "bool"
      },
      {
        "name": "Tippy",
        "code": "tip",
        "type": "bool"
      },
      { 
        "name": "Dropped Corals (>2)",
        "code": "dn",
        "type": "bool"
      },
      {
        "name": "Good Alliance Partner?",
        "tooltip": "Would you want this robot on your alliance in eliminations?",
        "code": "all",
        "type": "bool"
      },
      {
        "name": "Comments",
        "code": "co",
        "type": "text",
        "size": 15,
        "maxSize": 55
      }
    ]
  }`;
  