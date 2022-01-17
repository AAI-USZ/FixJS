function(ctx) {
      // Create the font string
      var font = [
        this.fontStyle,
        this.fontWeight,
        this.fontSize + 'px/' + this.lineHeight,
        this.fontFamily
      ];

      ctx.fillStyle = this.fill;
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.strokeWidth;

      ctx.font = font.join(' ');
      ctx.textAlign = this.textAlign;

      this.transform(ctx);
      this.width = ctx.measureText(this.text).width;
      this.height = this.fontSize;

      ctx.fillText(this.text, -this.width / 2, 0);

      if(this.strokeStyle) {
        ctx.strokeText(this.text, -this.width / 2, 0);
      }

      this.setCoords();
    }