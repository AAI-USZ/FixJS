function(d,i) {
            return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
          }