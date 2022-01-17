function() {
        if (this.isRemote) {
          return this.sourceImg;
        }

        if (!this.__isDirty) {
          return this.imageData;
        }

        var canvasData = getCanvasData(this.sourceImg);
        return canvasData.context.getImageData(0, 0, this.width, this.height);
      }