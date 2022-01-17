function init() {
    // init game
    player = 0;
    gameEnded = false;
    spawns = new Array(4);
    ingredients = ["Top bun", "Cheese", "Lettuce",
        "Onion", "Tomato", "Patty", "Bottom bun"];
        
    // init ui
    ui_column0 = new Array(9);
    ui_column1 = new Array(9);
    ui_column2 = new Array(9);
    ui_column3 = new Array(9);
    ui_spawnRow = new Array(4);
    ui_playerRow = new Array(4);
    
    function initSection(section, offset, cellType) {
        var idName;
        for (var i = 0; i < section.length; i++) {
            idName = cellType + (offset + i);
            section[i] = document.getElementById(idName);
        }
    }      
    
    initSection(ui_column0, 0, "grid");
    initSection(ui_column1, 9, "grid");
    initSection(ui_column2, 18, "grid");
    initSection(ui_column3, 27, "grid");
    initSection(ui_spawnRow, 0, "spawn");
    initSection(ui_playerRow, 0, "player");
    ui_playerRow[player].className = "playerSelected";
    ui_playerRow[player+1].className = "playerSelected";
    generateRandomIngredients();
    updateUI();
}