function() {
            this.tileLayer.width = Globals.board.width;
            this.tileLayer.height = Globals.board.height;

            this.effectLayer.width = Globals.board.width;
            this.effectLayer.height = Globals.board.height;

            this.renderer = CanvasRenderer.create().init(this);
            this.gameState.render = this.renderer;

            this.gameState.addEventListener("startRound", this, false);
            this.gameState.addEventListener("endRound", this, false);

            this.effectLayer.addEventListener("mousedown", this, false);
            this.effectLayer.addEventListener("mousemove", this, false);
            document.addEventListener("mouseup", this, false);

            this.effectLayer.addEventListener("touchstart", this, false);
            this.effectLayer.addEventListener("touchmove", this, false);
            document.addEventListener("touchend", this, false);
        }