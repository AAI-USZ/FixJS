function(tiles) {
        var debugStr = "";
        for (var i = 0; i < tiles.length; i++)
        {
            for (var j = 0; j < tiles[i].length; j++)
            {
                debugStr += tiles[i][j];
            }
            debugStr += "\n";
        }

        console.log(debugStr);
    }