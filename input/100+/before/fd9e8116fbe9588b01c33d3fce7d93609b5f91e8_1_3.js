function(match, index) {
      var result = [], upper, lower, ind, letter, lastWasLower, lastEntry;
      console.info('starting with', match, index);
      while(index < match.length) {
        letter = match.charAt(index);
        lastEntry = result[index - 1];
        if((ind = UpperAsianDigits.indexOf(letter)) > -1) {
          if(!lastEntry) {
            lastEntry = { digit: 1, place: 0 };
            result.unshift(lastEntry);
          }
          lastEntry.place += ind + 1;
        } else if((ind = LowerAsianDigits.indexOf(letter)) > -1) {
          result.push({ digit: ind, place: 0 });
          if(lastEntry) {
            console.info('ahmmmmmmmmmmm');
            lastEntry.place += 1;
          }
        }
        index++;
      }
      var x = result.map(function(d) {
        return Math.pow(10, d.place) * d.num;
      });
      console.info('harf', x, result);
      return x;
      /*
      return match.split('').map(function(letter) {
        return index > -1 ? index : '';
      }).join('');
      */
    }