function updateUI() {
    // spawn row: generate random ingredients
    for (var i = 0; i < ui_spawnRow.length; i++) {
        ui_spawnRow[i].innerHTML =
            ingredients[Math.ceil(Math.random() * 6)];
    }
    
    // columns: update any swaps
    
    
    // player row: update selected columns
    for (var i = 0; i < ui_playerRow.length; i++) {
        if (i === player || i === player+1) {
            ui_playerRow[i].className = "playerSelected";
        }
        else {
            ui_playerRow[i].className = "";
        }
    }
}