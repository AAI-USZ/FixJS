function() {
          switch (build) {
            case 'custom':       return 3;
            case 'custom-debug': return 2;
            case 'prod':         return 1;
          }
          return 0;
        }