function(col, row, patch){
        // tht062812: generate random points in the 4 border parts and connect them
        // http://roguebasin.roguelikedevelopment.org/index.php/Irregular_Shaped_Rooms
        var maxPointPerBorder = 5;
        var points = [];
        var maxCol = col - patch - 1,
            maxRow = row - patch - 1;

        // Create an empty maps
        var tiles = [];
        for (var i = 0; i < row; i++) {
            tiles[i] = [];
            for (var j = 0; j < col; j++) {
                tiles[i][j] = 0;
            }
        }

        // Generate top border
        var c = patch,
            r = 0,
            t = 0;
        while (c < maxCol && t < maxPointPerBorder)
        {
            // select a random column between the last column and the max column
            c = Crafty.math.randomInt(c + 1, maxCol);
            // select a random row in the patch
            r = Crafty.math.randomInt(0, patch - 1);
            points.push({x: c, y: r});
            t++;
        }
        // Generate right border
        r = patch;
        t = 0;
        while (r < maxRow && t < maxPointPerBorder)
        {
            // select a random row between the last row and the max row
            r = Crafty.math.randomInt(r + 1, maxRow);
            // select a random row in the patch
            c = Crafty.math.randomInt(1, patch) + col - patch - 1;
            points.push({x: c, y: r});
            t++;
        }
        // Generate bottom border
        c = maxCol;
        t = 0;
        while (c > patch && t < maxPointPerBorder)
        {
            // select a random column between the last column and the min column
            c = Crafty.math.randomInt(patch, c - 1);
            // select a random row in the patch
            r = Crafty.math.randomInt(1, patch) + row - patch - 1;
            points.push({x: c, y: r});
            t++;
        }
        // Generate left border
        r = maxRow;
        t = 0;
        while (r > patch && t < maxPointPerBorder)
        {
            // select a random row between the last row and the min row
            r = Crafty.math.randomInt(patch, r - 1);
            // select a random row in the patch
            c = Crafty.math.randomInt(0, patch - 1);
            points.push({x: c, y: r});
            t++;
        }

        // Generate border lines
        var borderPoints = [];
        for (var i = 0; i < points.length - 1; i++)
        {
            this.drawLine(points[i], points[i + 1], tiles);
        }
        this.drawLine(points[points.length - 1], points[0], tiles);

        this.fillRegion(tiles, patch);

//        this.debugShowMap(tiles);

        return tiles;
    }