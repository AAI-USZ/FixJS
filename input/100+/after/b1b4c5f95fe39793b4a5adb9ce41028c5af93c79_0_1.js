function(col) {
      var that = this;
      var flag = false;
      // Starting points
      if ($.inArray(that.substr(0,1),['1','2','3','4','5','6','7','8','9']) !== -1 ) {
        that = that.substr(1,(that.length-1));
        flag = true;
      }
      // Check neighboring tiles. Even checks W, NW vertices; odd checks SW, W, NW and NE vertices.
            
      // Tiles with layers
      if (terrainTable[that] !== undefined) {
        draw(dataDirectory + 'core/images/terrain/' + terrainTable[that]['symbol'],col,row);
      } else if (terrainTable[that.split('^')[0]] !== undefined) {
        draw(dataDirectory + 'core/images/terrain/' + terrainTable[that.split('^')[0]]['symbol'],col,row);
        if (terrainTable['^' + that.split('^')[1]] !== undefined) {
          draw(dataDirectory + 'core/images/terrain/' + terrainTable['^' + that.split('^')[1]]['symbol'],col,row);
        }
      }


      if (flag === true) {          draw(dataDirectory + '../images/editor/tool-overlay-starting-position.png',col,row);
      }
    }