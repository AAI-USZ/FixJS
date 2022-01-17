function (e) {
      var imageOrigin = this.imageOrigin,
          oldOrigin = this.firstOrigin,
          relX = Math.min(this.imageSize[0], Math.max(0, e.pageX - imageOrigin[0])),
          relY = Math.min(this.imageSize[1], Math.max(0, e.pageY - imageOrigin[1])),
          dX = relX - oldOrigin[0],
          dY = relY - oldOrigin[1],
          newSize = [],
          newOrigin = [];

      if (this.dragging) {
         newSize = this.value.size;
         newOrigin[0] = Math.max(0, Math.min(this.imageSize[0] - newSize[0], this.value.origin[0] + dX));
         newOrigin[1] = Math.max(0, Math.min(this.imageSize[1] - newSize[1], this.value.origin[1] + dY));
         this.firstOrigin = [relX, relY];
      }
      else {
         newSize = [Math.abs(dX), Math.abs(dY)]
         newOrigin[0] = (dX < 0 ? relX : oldOrigin[0]);
         newOrigin[1] = (dY < 0 ? relY : oldOrigin[1]);
      }

      this.setValue({origin: newOrigin, size: newSize}, false);
   }