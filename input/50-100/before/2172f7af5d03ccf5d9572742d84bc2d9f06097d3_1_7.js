function(chunkNo, chunk) {
          chunk.row = undefined; // reset
          if (!(chunk.text in chunkTexts)) chunkTexts[chunk.text] = []
          var chunkText = chunkTexts[chunk.text];

          // here we also need all the spans that are contained in
          // chunks with this text, because we need to know the position
          // of the span text within the respective chunk text
          chunkText.push.apply(chunkText, chunk.spans);
          // and also the markedText boundaries
          chunkText.push.apply(chunkText, chunk.markedTextStart);
          chunkText.push.apply(chunkText, chunk.markedTextEnd);
        }