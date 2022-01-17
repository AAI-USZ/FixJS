function (x, y) {
    var self = this;
    var points = [
        [ x - 0.5, y + 0.5 ],
        [ x - 0.5, y - 0.5 ],
        [ x + 0.5, y - 0.5 ],
        [ x + 0.5, y + 0.5 ]
    ].map(function (pt) { return self.toWorld(pt[0], pt[1]) });
    
    var tile = this.paper.path(polygon(points));
    tile.data('x', x);
    tile.data('y', y);
    this.tiles[x + ',' + y] = tile;
    return tile;
}