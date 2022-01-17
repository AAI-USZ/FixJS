function(arcNo, arc) {
          arc.jumpHeight = 0;
          var fromFragment = data.spans[arc.origin].headFragment;
          var toFragment = data.spans[arc.target].headFragment;
          if (fromFragment.lineIndex > toFragment.lineIndex) {
            var tmp = fromFragment; fromFragment = toFragment; toFragment = tmp;
          }
          var from, to;
          if (fromFragment.chunk.index == toFragment.chunk.index) {
            from = fromFragment.lineIndex;
            to = toFragment.lineIndex;
          } else {
            from = fromFragment.lineIndex + 1;
            to = toFragment.lineIndex - 1;
          }
          for (var i = from; i <= to; i++) {
            if (arc.jumpHeight < fragmentHeights[i * 2]) arc.jumpHeight = fragmentHeights[i * 2];
          }
        }