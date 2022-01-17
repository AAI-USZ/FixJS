function (size) {
        this._squareVertices[1].x = size.width * cc.CONTENT_SCALE_FACTOR();
        this._squareVertices[2].y = size.height * cc.CONTENT_SCALE_FACTOR();
        this._squareVertices[3].x = size.width * cc.CONTENT_SCALE_FACTOR();
        this._squareVertices[3].y = size.height * cc.CONTENT_SCALE_FACTOR();
        this._super(size);
    }