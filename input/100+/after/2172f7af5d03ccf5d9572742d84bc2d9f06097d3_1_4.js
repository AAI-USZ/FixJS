f          var from = this[0];
          var to = this[1];
          if (firstFrom === null) firstFrom = from;

          // Replaced for speedup; TODO check correctness
          // inSpan = false;
          // $.each(data.spans, function(spanNo, span) {
          //   if (span.from < to && to < span.to) {
          //     // it does; no word break
          //     inSpan = true;
          //     return false;
          //   }
          // });

          // Is the token end inside a span?
          if (startFragmentId && to > sortedFragments[startFragmentId - 1].to) {
            while (startFragmentId < numFragments && to > sortedFragments[startFragmentId].from) {
              startFragmentId++;
            }
          }
          currentFragmentId = startFragmentId;
          while (currentFragmentId < numFragments && to >= sortedFragments[currentFragmentId].to) {
            currentFragmentId++;
          }
          // if yes, the next token is in the same chunk
          if (currentFragmentId < numFragments && to > sortedFragments[currentFragmentId].from) {
            return;
          }

          // otherwise, create the chunk found so far
          space = data.text.substring(lastTo, firstFrom);
          var text = data.text.substring(firstFrom, to);
          if (chunk) chunk.nextSpace = space;
          //               (index,     text, from,      to, space) {
          chunk = new Chunk(chunkNo++, text, firstFrom, to, space);
          data.chunks.push(chunk);
          lastTo = to;
          firstFrom = null;
        });
