function(a,b) { 
          var ac = currentChunk.fragments[a];
          var bc = currentChunk.fragments[b]
          var startDiff = Util.cmp(ac.from, bc.from);
          return startDiff != 0 ? startDiff : Util.cmp(bc.to-bc.from, ac.to-ac.from);
        }