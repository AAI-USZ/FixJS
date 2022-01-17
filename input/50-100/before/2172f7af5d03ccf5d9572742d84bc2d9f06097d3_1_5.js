function(spanId, span) {
          while (span.to > (chunk = data.chunks[currentChunkId]).to) currentChunkId++;
          chunk.spans.push(span);
          span.text = chunk.text.substring(span.from - chunk.from, span.to - chunk.from);
          span.chunk = chunk;
        }