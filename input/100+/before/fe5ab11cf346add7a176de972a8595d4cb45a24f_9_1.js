function (gid) {
        var rect = cc.RectZero();
        rect.size = this._tileSize;
        gid = gid - parseInt(this.firstGid);
        var max_x = parseInt((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing));
        rect.origin.x = parseInt((gid % max_x) * (this._tileSize.width + this.spacing) + this.margin);
        rect.origin.y = parseInt(parseInt(gid / max_x) * (this._tileSize.height + this.spacing) + this.margin);
        return rect;
    }