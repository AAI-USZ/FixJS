function (value, sendUpdatedEvt) {

      if (!this.imageSize) {
         return;
      }

      var cleanValue = Y.clone(value),
          minSize    = this.options.minSize;

      cleanValue.size = [Math.min(this.imageSize[0], Math.max(minSize[0], cleanValue.size[0])),
                         Math.min(this.imageSize[1], Math.max(minSize[1], cleanValue.size[1]))];

      if (this.options.ratio) {
         cleanValue = this._constrain(cleanValue);
      }

      var padding = this.options.padding,
          n = padding + cleanValue.origin[1],
          s = padding + cleanValue.origin[1] + cleanValue.size[1],
          e = padding + cleanValue.origin[0] + cleanValue.size[0],
          w = padding + cleanValue.origin[0],
          width  = (padding * 2) + this.imageSize[0],
          height = (padding * 2) + this.imageSize[1];

      this.value = cleanValue;

      this.mask.n.setStyles ({width: width, height: n});
      this.mask.s.setStyles ({width: width, height: height - s});
      this.mask.e.setStyles ({top: n, height: s - n, width: width - e});
      this.mask.w.setStyles ({top: n, height: s - n, width: w});
      this.mask.border.setStyles({top: n - 1, left: w - 1, width: cleanValue.size[0], height: cleanValue.size[1]});

      if(sendUpdatedEvt !== false) {
         this.fireUpdatedEvt();
      }
   }