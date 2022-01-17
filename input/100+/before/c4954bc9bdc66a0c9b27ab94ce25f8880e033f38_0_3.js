function (border, offset, width, height, rows, columns) {
        
        row    = Math.floor((y - offset) / (height / rows   )) + 1;
        column = Math.floor((x - offset) / (width  / columns)) + 1;
        
        row    = Math.min(Math.max(1, row), rows),
        column = Math.min(Math.max(1, column), columns)
    }