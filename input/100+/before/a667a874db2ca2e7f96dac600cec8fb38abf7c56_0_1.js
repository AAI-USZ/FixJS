function decodeCharString(array) {
    var charstring = [];
    var lsb = 0;
    var width = 0;
    var flexState = 0;

    var value = '';
    var count = array.length;
    for (var i = 0; i < count; i++) {
      value = array[i];

      if (value < 32) {
        var command = null;
        if (value == kEscapeCommand) {
          var escape = array[++i];

          // TODO Clean this code
          if (escape == 16) {
            var index = charstring.pop();
            var argc = charstring.pop();
            for (var j = 0; j < argc; j++)
              charstring.push('drop');

            // If the flex mechanism is not used in a font program, Adobe
            // states that entries 0, 1 and 2 can simply be replaced by
            // {}, which means that we can simply ignore them.
            if (index < 3) {
              continue;
            }

            // This is the same things about hint replacement, if it is not used
            // entry 3 can be replaced by {3}
            // TODO support hint replacment
            if (index == 3) {
              charstring.push(3);
              i++;
              continue;
            }
          } else if (escape == 17 || escape == 33) {
            // pop or setcurrentpoint commands can be ignored
            // since we are not doing callothersubr
            continue;
          } else if (!kHintingEnabled && (escape == 1 || escape == 2)) {
            charstring.push('drop', 'drop', 'drop', 'drop', 'drop', 'drop');
            continue;
          }

          command = charStringDictionary['12'][escape];
        } else {
          // TODO Clean this code
          if (value == 13) { // hsbw
            if (charstring.length == 2) {
              lsb = charstring[0];
              width = charstring[1];
              charstring.splice(0, 1);
            } else if (charstring.length == 4 && charstring[3] == 'div') {
              lsb = charstring[0];
              width = charstring[1] / charstring[2];
              charstring.splice(0, 1);
            } else if (charstring.length == 4 && charstring[2] == 'div') {
              lsb = charstring[0] / charstring[1];
              width = charstring[3];
              charstring.splice(0, 3);
            } else {
              error('Unsupported hsbw format: ' + charstring);
            }

            charstring.push(lsb, 'hmoveto');
            continue;
          } else if (value == 10) { // callsubr
            if (charstring[charstring.length - 1] < 3) { // subr #0..2
              var subrNumber = charstring.pop();
              switch (subrNumber) {
                case 1:
                  flexState = 1; // prepare for flex coordinates
                  break;
                case 2:
                  flexState = 2; // flex in progress
                  break;
                case 0:
                  // type2 flex command does not need final coords
                  charstring.push('exch', 'drop', 'exch', 'drop');
                  charstring.push('flex');
                  flexState = 0;
                  break;
              }
              continue;
            }
          } else if (value == 21 && flexState > 0) {
            if (flexState > 1)
              continue; // ignoring rmoveto
            value = 5; // first segment replacing with rlineto
          } else if (!kHintingEnabled && (value == 1 || value == 3)) {
            charstring.push('drop', 'drop');
            continue;
          }
          command = charStringDictionary[value];
        }

        // Some charstring commands are meaningless in Type2 and will return
        // a null, let's just ignored them
        if (!command && i < count) {
          continue;
        } else if (!command) {
          break;
        } else if (command == -1) {
          warn('Support for Type1 command ' + value +
                ' (' + escape + ') is not implemented in charstring: ' +
                charstring);
          if (value == 12) {
            // we know how to ignore only some the Type1 commands
            switch (escape) {
              case 7:
                charstring.push('drop', 'drop', 'drop', 'drop');
                continue;
              case 8:
                charstring.push('drop');
                continue;
            }
          }
        }

        value = command;
      } else if (value <= 246) {
        value = value - 139;
      } else if (value <= 250) {
        value = ((value - 247) * 256) + array[++i] + 108;
      } else if (value <= 254) {
        value = -((value - 251) * 256) - array[++i] - 108;
      } else {
        value = (array[++i] & 0xff) << 24 | (array[++i] & 0xff) << 16 |
                (array[++i] & 0xff) << 8 | (array[++i] & 0xff) << 0;
      }

      charstring.push(value);
    }

    return { charstring: charstring, width: width, lsb: lsb };
  }