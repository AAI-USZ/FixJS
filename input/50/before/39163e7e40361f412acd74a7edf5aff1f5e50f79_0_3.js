function(e, pos) {
      if (this.options.crosshair.mode)
        this.crosshair.clearCrosshair();
      if (this.options.crosshair.mode)
        this.crosshair.drawCrosshair(pos);
    }