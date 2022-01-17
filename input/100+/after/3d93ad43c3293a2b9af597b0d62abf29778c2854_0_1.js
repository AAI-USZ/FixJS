function(session, foldStyle, row) {
        var line = session.getLine(row);
        var level1 = /^(Found.*|Searching for.*)$/;
        var level2 = /^(\w.*\:|\s*)$/;
        var re = level1.test(line) ? level1 : level2;

        if (this.foldingStartMarker.test(line)) {            
            for (var i = row + 1, l = session.getLength(); i < l; i++) {
                if (re.test(session.getLine(i)))
                    break;
            }

            return new Range(row, line.length, i, 0);
        }

        if (this.foldingStopMarker.test(line)) {
            for (var i = row - 1; i >= 0; i--) {
                line = session.getLine(i);
                if (re.test(line))
                    break;
            }

            return new Range(i, line.length, row, 0);
        }
    }