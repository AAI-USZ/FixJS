function(a,b) { 
          var ac = currentChunk.spans[a];
          var bc = currentChunk.spans[b]
          var endDiff = Util.cmp(bc.to, ac.to);
          return endDiff != 0 ? endDiff : Util.cmp(bc.to-bc.from, ac.to-ac.from);
        }