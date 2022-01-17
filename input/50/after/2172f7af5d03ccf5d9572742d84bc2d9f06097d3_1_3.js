function(chunkNo, chunk) {
            // sort
            chunk.fragments.sort(fragmentComparator);
            // renumber
            $.each(chunk.fragments, function(fragmentNo, fragment) {
              fragment.indexNumber = fragmentNo;
              fragment.refedIndexSum = 0;
            });
          }