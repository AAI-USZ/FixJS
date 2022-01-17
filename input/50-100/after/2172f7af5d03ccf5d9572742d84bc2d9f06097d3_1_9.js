function(a,b) { 
          var ac = currentChunk.fragments[a];
          var bc = currentChunk.fragments[b]
          var endDiff = Util.cmp(bc.to, ac.to);
          return endDiff != 0 ? endDiff : Util.cmp(bc.to-bc.from, ac.to-ac.from);
        }