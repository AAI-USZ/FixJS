function Iterator(conversion, removeItem) {
        var bucketIndex = 0;
        var itemIndex = -1;
        var endOfBuckets = false;

        function findNext() {
          while (!endOfBuckets) {
            ++itemIndex;
            if (bucketIndex >= buckets.length) {
              endOfBuckets = true;
            } else if (buckets[bucketIndex] === undef || itemIndex >= buckets[bucketIndex].length) {
              itemIndex = -1;
              ++bucketIndex;
            } else {
              return;
            }
          }
        }

        /*
        * @member Iterator
        * Checks if the Iterator has more items
        */
        this.hasNext = function() {
          return !endOfBuckets;
        };

        /*
        * @member Iterator
        * Return the next Item
        */
        this.next = function() {
          var result = conversion(buckets[bucketIndex][itemIndex]);
          findNext();
          return result;
        };

        /*
        * @member Iterator
        * Remove the current item
        */
        this.remove = function() {
          removeItem(this.next());
          --itemIndex;
        };

        findNext();
      }