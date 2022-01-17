function (obj) {
         if (buffer) {
            console.log('loading buffer', buffer);
            load.apply(null, buffer);
            buffer = null;
         }
          return {message:'hey'};
        }