function updateMiniMap() {
        var minimap = document.getElementById('minimap');
        var ctx = minimap.getContext('2d');
        var x, y;
        var x0 = Math.round(mainCharacter.getX()); 
        var y0 = Math.round(mainCharacter.getY());
        for(y = -17; y <= 17; ++y) {
            for(x = -17; x <= 17; ++x) {
                var tile = world.get(x0+x, y0+y);
                if(x === 0 && y === 0) {
                    ctx.fillStyle = "rgba(255,0,0,.03)";
                } else if(tile.item) {
                    ctx.fillStyle = 'rgba(0,255,255,.03)';
                } else if(!tile.passable) {
                    ctx.fillStyle = 'rgba(0,0,0,.03)';
                } else {
                    ctx.fillStyle = "rgba(255,255,255,.03)";
                }
                ctx.fillRect(99 + 6*x, 99+6*y, 5, 5);
            }
        }
        setTimeout(updateMiniMap, 100);
    }