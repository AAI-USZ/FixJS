function() {
        _this.ctx.strokeStyle = _this.options.scaleColor;
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, _this.options.size / 2 - _this.options.size * 0.08 - _this.options.lineWidth / 2, 0, Math.PI * 2, true);
        _this.ctx.closePath();
        _this.ctx.strokeStyle = _this.options.trackColor;
        _this.ctx.lineWidth = _this.options.lineWidth;
        _this.ctx.stroke();
      }