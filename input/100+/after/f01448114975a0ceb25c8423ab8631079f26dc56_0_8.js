function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width, height = regionInfo.height;
      var rowSize = (pageInfo.width + 7) >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ?
        regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      for (var i = 0; i < height; i++) {
        var mask = 128 >> (regionInfo.x & 7);
        var offset = (i + regionInfo.y) * rowSize + (regionInfo.x >> 3);
        switch (combinationOperator) {
          case 0: // OR
            for (var j = 0; j < width; j++) {
              buffer[offset] |= bitmap[i][j] ? mask : 0;
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            break;
          case 2: // XOR
            for (var j = 0; j < width; j++) {
              buffer[offset] ^= bitmap[i][j] ? mask : 0;
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            break;
          default:
            error('JBIG2 error: operator ' + combinationOperator +
                  ' is not supported');
        }
      }
    }