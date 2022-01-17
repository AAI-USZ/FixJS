function() {
    // Keyboard key configuration
    cp.input.bind('arrowUp', 'up');
    cp.input.bind('arrowDown', 'down');
    cp.input.bind('arrowLeft', 'left');
    cp.input.bind('arrowRight', 'right');
    cp.input.bind('x', 'shoot');
    
    // Spawn objects
    cp.game.spawn('Background');
    cp.game.spawn('Player');
    cp.game.spawn('Director');
    cp.game.spawn('PowerupLaBomba');
    cp.game.spawn('PowerupShield');
}