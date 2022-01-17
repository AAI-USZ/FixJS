function(input)
    {
      var len = input.length;

      if (len > 4 || len == 0) {
        throw new Error( "Invalid number of arguments!" );
      }

      var result = qx.lang.Array.copy(input);

      // Copy Values (according to the length)
      switch(len)
      {
        case 1:
          result[1] = result[2] = result[3] = result[0];
          break;

        case 2:
          result[2] = result[0];

          // no break here

        case 3:
          result[3] = result[1];
      }

      // Return list with 4 items
      return result;
    }