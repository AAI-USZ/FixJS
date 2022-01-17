function(chunkNo, chunk) {
            // sort
            chunk.spans.sort(spanSortComparator);
            // renumber
            $.each(chunk.spans, function(spanNo, span) {
              span.indexNumber = spanNo;
              span.refedIndexSum = 0;
            });
          }