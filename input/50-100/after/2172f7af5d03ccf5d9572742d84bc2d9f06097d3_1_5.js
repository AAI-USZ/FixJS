function(fragmentId, fragment) {
          while (fragment.to > (chunk = data.chunks[currentChunkId]).to) currentChunkId++;
          chunk.fragments.push(fragment);
          fragment.text = chunk.text.substring(fragment.from - chunk.from, fragment.to - chunk.from);
          fragment.chunk = chunk;
        }