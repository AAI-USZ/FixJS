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
          if (startSpanId && to > sortedSpans[startSpanId - 1].to) {
            while (startSpanId < numSpans && to > sortedSpans[startSpanId].from) {
              startSpanId++;
            }
          }
          currentSpanId = startSpanId;
          while (currentSpanId < numSpans && to >= sortedSpans[currentSpanId].to) {
            currentSpanId++;
          }
          // if yes, the next token is in the same chunk
          if (currentSpanId < numSpans && to > sortedSpans[currentSpanId].from) {
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
