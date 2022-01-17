function updateMiniMap() {
        var minimap = document.getElementById('minimap');
        var ctx = minimap.getContext('2d');
        var x, y;
        var x0 = Math.round(mainCharacter.getX()); 
        var y0 = Math.round(mainCharacter.getY());
        ctx.fillStyle = 'rgba(0,0,0,.03)';
        ctx.fillRect(0,0,200,200);
        for(y = -20; y <= 20; ++y) {
            for(x = -20; x <= 20; ++x) {
                var tile = world.get(x0+x, y0+y);
                if(tile.passable) {
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(99 + 6*x, 99+6*y, 5, 5);
                }
                    
                if(tile.item) {
                    ctx.fillStyle = '#0cc';
                    ctx.fillRect(100 + 6*x, 100+6*y, 3, 3);
                }
    
            }
        }
        ctx.fillStyle = "#f00";
        ctx.fillRect(100,100,3,3);
        setTimeout(updateMiniMap, 100);
    }