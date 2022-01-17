function pointsAreOnSameSideOfLine(line, points) {
        var a = line[0][1] - line[1][1];
        var b = line[1][0] - line[0][0];
        var c = -a*line[0][0] - b*line[0][1];
        var retval = ((a*points[0][0] + b*points[0][1] + c) * (a*points[1][0] + b*points[1][1] + c) > 0)
        return retval;
    }