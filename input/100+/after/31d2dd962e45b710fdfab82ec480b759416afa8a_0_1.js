function _addTypeSensitiveKeys(inputType, row, space, where, overwrites) {
    overwrites = overwrites || {};
    switch (inputType) {
      case 'url':
        space.ratio -= 5;
        row.splice(where, 1, // delete space
          { value: '.', ratio: 1, keyCode: 46 },
          { value: '/', ratio: 2, keyCode: 47 },
          { value: '.com', ratio: 2, keyCode: DOT_COM }
        );
      break;

      case 'email':
        space.ratio -= 2;
        row.splice(where, 0, { value: '@', ratio: 1, keyCode: 64 });
        row.splice(where + 2, 0, { value: '.', ratio: 1, keyCode: 46 });
      break;

      case 'text':

        var next = where + 1;
        if (overwrites['.'] !== false) {
          space.ratio -= 1;
          next = where + 2;
        }
        if (overwrites[','] !== false)
          space.ratio -= 1;

        if (overwrites[',']) {
          row.splice(where, 0, {
            value: overwrites[','],
            ratio: 1,
            keyCode: overwrites[','].charCodeAt(0)
          });
        } else if (overwrites[','] !== false) {
          row.splice(where, 0, {
            value: ',',
            ratio: 1,
            keyCode: 44
          });
        }


        if (overwrites['.']) {
          row.splice(next, 0, {
            value: overwrites['.'],
            ratio: 1,
            keyCode: overwrites['.'].charCodeAt(0)
          });
        } else if (overwrites['.'] !== false) {
          row.splice(next, 0, {
            value: '.',
            ratio: 1,
            keyCode: 46
          });
        }

      break;
    }

  }