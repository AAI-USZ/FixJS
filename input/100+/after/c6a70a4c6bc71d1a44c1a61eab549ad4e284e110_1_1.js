function(point, circle, board) {
        var dist = point.coords.distance(JXG.COORDS_BY_USER, circle.center.coords),
            P = point.coords.usrCoords,
            M = circle.center.coords.usrCoords,
            x, y, factor;

        if (!JXG.exists(board)) {
            board = point.board;
        }
        if (Math.abs(dist) < JXG.Math.eps) {
            dist = JXG.Math.eps;
        }
        factor = circle.Radius() / dist;
        x = M[1] + factor * (P[1] - M[1]);
        y = M[2] + factor * (P[2] - M[2]);

        return new JXG.Coords(JXG.COORDS_BY_USER, [x, y], board);
    }