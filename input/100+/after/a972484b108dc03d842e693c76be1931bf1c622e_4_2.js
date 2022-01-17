function () {
        var logoWidth = (cc.canvas.width - this._logo.width) / 2;
        var logoHeight = (cc.canvas.height - this._logo.height) / 2;
        cc.renderContext.clearRect(0, -cc.canvas.height, cc.canvas.width, cc.canvas.height);
        cc.renderContext.fillStyle = "#202020";
        cc.renderContext.fillRect(0, -cc.canvas.height, cc.canvas.width, cc.canvas.height);
        cc.drawingUtil.drawImage(this._logo, cc.p(logoWidth, logoHeight));
        cc.renderContext.fillStyle = "#b2b4b3";
        cc.renderContext.font = 'Bold 12px Verdana';
        cc.renderContext.textAlign = 'left';
        cc.drawingUtil.fillText("Loading " + cc.Loader.shareLoader().getProgressBar() + "%", logoWidth + 30, logoHeight - 15);
    }