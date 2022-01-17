function(blocks) {
      var domBlocks = $(blocks);
      var domBlocksLength = domBlocks.length;
      var domArray = [];
      for (var i = 0; i < domBlocksLength; i = i + 10) {
         domArray.push(domBlocks.slice(i,i + 10));
      }
      return domArray;
   }