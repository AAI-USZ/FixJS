function (mm) {
          /* If this method has more outputs, move on. */
          if (mm.outputs.length >= mmNumOutputs) { return; }
          /* If this method has all free outputs, then select it. */
          var isAllFree = mm.outputs.every(function (ww) {
            return ww.inner.isFree();
          }, this);
          if (isAllFree) {
            mmSelected = mm;
            mmNumOutputs = mm.outputs.length;
          }
        }