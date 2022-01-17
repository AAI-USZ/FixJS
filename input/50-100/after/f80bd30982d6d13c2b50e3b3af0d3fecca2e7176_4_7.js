function (size) {
        this._squareVertices[1].x = size.width;
        this._squareVertices[2].y = size.height;
        this._squareVertices[3].x = size.width;
        this._squareVertices[3].y = size.height;
        this._super(size);
    }