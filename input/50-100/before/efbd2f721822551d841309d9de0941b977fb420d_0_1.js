function(tiles) {
        var debugStr = "";
        for (i = 0; i < tiles.length; i++)
        {
            for (j = 0; j < tiles[i].length; j++)
            {
                debugStr += tiles[i][j];
            }
            debugStr += "\n";
        }
        
        console.log(debugStr);
    }