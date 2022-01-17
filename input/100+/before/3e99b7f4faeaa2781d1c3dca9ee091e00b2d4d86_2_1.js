function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i, false, true);

            var range = session.getCommentFoldRange(row, i + match[0].length);
            range.end.column -= 2;
            return range;
        }

        if (foldStyle !== "markbeginend")
            return;
            
        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[2]) {
                var range = session.getCommentFoldRange(row, i);
                range.end.column -= 2;
                return range;
            }

            var end = {row: row, column: i};
            var start = session.$findOpeningBracket(match[1], end);
            
            if (!start)
                return;

            start.column++;
            end.column--;

            return  Range.fromPoints(start, end);
        }
    }