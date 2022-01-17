function(f) {
        i = 0;
        while(i < arr.length) {
          if(multiMatch(arr[i], f, arr, [i, arr])) {
            arr.splice(i, 1);
          } else {
            i++;
          }
        }
      }