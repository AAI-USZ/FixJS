function(str) {
      var i, searchIndex = 1;
      // pre-condition: str.length > 1
      while (true) {
        searchIndex = str.indexOf(str[0], searchIndex);
        if (searchIndex === -1)
          throw "No closing quotation mark was found for the string starting with " + str.slice(0, Math.min(5, str.length)) + "...";
        // Check if there's an odd number of escape characters before the quotation mark character
        for (i = searchIndex - 1; i > 0; --i)
          if (str[i] !== '\\') {
            if ((searchIndex - i) & 1 === 1) // There is an even number of slashes
              return { head: str.slice(0, searchIndex + 1), tail: str.slice(searchIndex + 1) };
            else // There is an odd number of slashes, so continue searching
              // TODO: Properly serialize the escaped character
              break;
          }
        searchIndex += 1;
      }
    }