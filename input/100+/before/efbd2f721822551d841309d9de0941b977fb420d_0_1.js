function(tiles) {
//        var dx = [0, 0, 1, -1];
//        var dy = [1, -1, 0, 0];
        var dir = [{x:0, y:1}, {x:0, y:-1}, {x:1, y:0}, {x:-1, y:0}];
        var row = tiles.length;
        var col = tiles[0].length;
        
        // Start from the center of the region
        var x0 = row / 2;
        var y0 = row / 2;
        
        var stack = [];
        stack.push({x: x0, y: y0});
        tiles[x0][y0] = 2;
        // Breadth first search
        while (stack.length > 0)
        {
            var cell = stack.pop();
            
            for (i = 0; i < dir.length; i++)
            {
                var x1 = cell.x + dir[i].x;
                var y1 = cell.y + dir[i].y;
                if (x1 >= 0 && x1 < row && y1 >= 0 && y1 < col)
                {
                    if (tiles[x1][y1] === 0)
                    {
                        tiles[x1][y1] = 2;
                        stack.push({x:x1, y:y1});
                    }
                }
            }
        }
    }