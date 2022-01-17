function type1Parser() {
  /*
   * Decrypt a Sequence of Ciphertext Bytes to Produce the Original Sequence
   * of Plaintext Bytes. The function took a key as a parameter which can be
   * for decrypting the eexec block of for decoding charStrings.
   */
  var kEexecEncryptionKey = 55665;
  var kCharStringsEncryptionKey = 4330;

  function decrypt(stream, key, discardNumber) {
    var r = key, c1 = 52845, c2 = 22719;
    var decryptedString = [];

    var value = '';
    var count = stream.length;
    for (var i = 0; i < count; i++) {
      value = stream[i];
      decryptedString[i] = value ^ (r >> 8);
      r = ((value + r) * c1 + c2) & ((1 << 16) - 1);
    }
    return decryptedString.slice(discardNumber);
  }

  /*
   * CharStrings are encoded following the the CharString Encoding sequence
   * describe in Chapter 6 of the "Adobe Type1 Font Format" specification.
   * The value in a byte indicates a command, a number, or subsequent bytes
   * that are to be interpreted in a special way.
   *
   * CharString Number Encoding:
   *  A CharString byte containing the values from 32 through 255 inclusive
   *  indicate an integer. These values are decoded in four ranges.
   *
   * 1. A CharString byte containing a value, v, between 32 and 246 inclusive,
   * indicate the integer v - 139. Thus, the integer values from -107 through
   * 107 inclusive may be encoded in single byte.
   *
   * 2. A CharString byte containing a value, v, between 247 and 250 inclusive,
   * indicates an integer involving the next byte, w, according to the formula:
   * [(v - 247) x 256] + w + 108
   *
   * 3. A CharString byte containing a value, v, between 251 and 254 inclusive,
   * indicates an integer involving the next byte, w, according to the formula:
   * -[(v - 251) * 256] - w - 108
   *
   * 4. A CharString containing the value 255 indicates that the next 4 bytes
   * are a two complement signed integer. The first of these bytes contains the
   * highest order bits, the second byte contains the next higher order bits
   * and the fourth byte contain the lowest order bits.
   *
   *
   * CharString Command Encoding:
   *  CharStrings commands are encoded in 1 or 2 bytes.
   *
   *  Single byte commands are encoded in 1 byte that contains a value between
   *  0 and 31 inclusive.
   *  If a command byte contains the value 12, then the value in the next byte
   *  indicates a command. This "escape" mechanism allows many extra commands
   * to be encoded and this encoding technique helps to minimize the length of
   * the charStrings.
   */
  var charStringDictionary = {
    '1': 'hstem',
    '3': 'vstem',
    '4': 'vmoveto',
    '5': 'rlineto',
    '6': 'hlineto',
    '7': 'vlineto',
    '8': 'rrcurveto',

    // closepath is a Type1 command that do not take argument and is useless
    // in Type2 and it can simply be ignored.
    '9': null, // closepath

    '10': 'callsubr',

    // return is normally used inside sub-routines to tells to the execution
    // flow that it can be back to normal.
    // During the translation process Type1 charstrings will be flattened and
    // sub-routines will be embedded directly into the charstring directly, so
    // this can be ignored safely.
    '11': 'return',

    '12': {
      // dotsection is a Type1 command to specify some hinting feature for dots
      // that do not take a parameter and it can safely be ignored for Type2.
      '0': null, // dotsection

      // [vh]stem3 are Type1 only and Type2 supports [vh]stem with multiple
      // parameters, so instead of returning [vh]stem3 take a shortcut and
      // return [vhstem] instead.
      '1': 'vstem',
      '2': 'hstem',

      // Type1 only command with command not (yet) built-in ,throw an error
      '6': -1, // seac
      '7': -1, // sbw

      '11': 'sub',
      '12': 'div',

      // callothersubr is a mechanism to make calls on the postscript
      // interpreter, this is not supported by Type2 charstring but hopefully
      // most of the default commands can be ignored safely.
      '16': 'callothersubr',

      '17': 'pop',

      // setcurrentpoint sets the current point to x, y without performing a
      // moveto (this is a one shot positionning command). This is used only
      // with the return of an OtherSubrs call.
      // TODO Implement the OtherSubrs charstring embedding and replace this
      // call by a no-op, like 2 'pop' commands for example.
      '33': null // setcurrentpoint
    },
    '13': 'hsbw',
    '14': 'endchar',
    '21': 'rmoveto',
    '22': 'hmoveto',
    '30': 'vhcurveto',
    '31': 'hvcurveto'
  };

  var kEscapeCommand = 12;

  // Breaks up the stack by arguments and also calculates the value.
  function breakUpArgs(stack, numArgs) {
    var args = [];
    var index = stack.length - 1;
    for (var i = 0; i < numArgs; i++) {
      if (index < 0) {
        args.unshift({ arg: [0],
                       value: 0 });
        warn('Malformed charstring stack: not enough values on stack.');
        continue;
      }
      var token = stack[index];
      if (token === 'div') {
        var a = stack[index - 2];
        var b = stack[index - 1];
        if (!isInt(a) || !isInt(b)) {
          warn('Malformed charsting stack: expected ints on stack for div.');
          a = 0;
          b = 1;
        }
        args.unshift({ arg: [a, b, 'div'],
                       value: a / b });
        index -= 3;
      } else if (isInt(token)) {
        args.unshift({ arg: stack.slice(index, index + 1),
                       value: token });
        index--;
      } else {
        warn('Malformed charsting stack: found bad token ' + token + '.');
      }
    }
    return args;
  }

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
          if (value == 13) { // hsbw
            var args = breakUpArgs(charstring, 2);
            var arg0 = args[0];
            var arg1 = args[1];
            lsb = arg0.value;
            width = arg1.value;
            // To convert to type2 we have to move the width value to the first
            // part of the charstring and then use hmoveto with lsb.
            charstring = arg1.arg;
            charstring = charstring.concat(arg0.arg);
            charstring.push('hmoveto');
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

  /*
   * Returns an object containing a Subrs array and a CharStrings
   * array extracted from and eexec encrypted block of data
   */
  function readNumberArray(str, index) {
    var start = index;
    while (str[index++] != '[')
      start++;
    start++;

    var count = 0;
    while (str[index++] != ']')
      count++;

    str = str.substr(start, count);

    str = str.trim();
    // Remove adjacent spaces
    str = str.replace(/\s+/g, ' ');

    var array = str.split(' ');
    for (var i = 0, ii = array.length; i < ii; i++)
      array[i] = parseFloat(array[i] || 0);
    return array;
  }

  function readNumber(str, index) {
    while (str[index] == ' ')
      index++;

    var start = index;

    var count = 0;
    while (str[index++] != ' ')
      count++;

    return parseFloat(str.substr(start, count) || 0);
  }

  function isSeparator(c) {
    return c == ' ' || c == '\n' || c == '\x0d';
  }

  this.extractFontProgram = function Type1Parser_extractFontProgram(stream) {
    var eexec = decrypt(stream, kEexecEncryptionKey, 4);
    var eexecStr = '';
    for (var i = 0, ii = eexec.length; i < ii; i++)
      eexecStr += String.fromCharCode(eexec[i]);

    var glyphsSection = false, subrsSection = false;
    var program = {
      subrs: [],
      charstrings: [],
      properties: {
        'privateData': {
          'lenIV': 4
        }
      }
    };

    var glyph = '';
    var token = '';
    var length = 0;

    var c = '';
    var count = eexecStr.length;
    for (var i = 0; i < count; i++) {
      var getToken = function getToken() {
        while (i < count && isSeparator(eexecStr[i]))
          ++i;

        var token = '';
        while (i < count && !isSeparator(eexecStr[i]))
          token += eexecStr[i++];

        return token;
      };
      var c = eexecStr[i];

      if ((glyphsSection || subrsSection) &&
          (token == 'RD' || token == '-|')) {
        i++;
        var data = eexec.slice(i, i + length);
        var lenIV = program.properties.privateData['lenIV'];
        var encoded = decrypt(data, kCharStringsEncryptionKey, lenIV);
        var str = decodeCharString(encoded);

        if (glyphsSection) {
          program.charstrings.push({
            glyph: glyph,
            data: str.charstring,
            lsb: str.lsb,
            width: str.width
          });
        } else {
          program.subrs.push(str.charstring);
        }
        i += length;
        token = '';
      } else if (isSeparator(c)) {
        length = parseInt(token, 10);
        token = '';
      } else {
        token += c;
        if (!glyphsSection) {
          switch (token) {
            case '/CharString':
              glyphsSection = true;
              break;
            case '/Subrs':
              ++i;
              var num = parseInt(getToken(), 10);
              getToken(); // read in 'array'
              for (var j = 0; j < num; ++j) {
                var t = getToken(); // read in 'dup'
                if (t == 'ND' || t == '|-' || t == 'noaccess')
                  break;
                var index = parseInt(getToken(), 10);
                if (index > j)
                  j = index;
                var length = parseInt(getToken(), 10);
                getToken(); // read in 'RD'
                var data = eexec.slice(i + 1, i + 1 + length);
                var lenIV = program.properties.privateData['lenIV'];
                var encoded = decrypt(data, kCharStringsEncryptionKey, lenIV);
                var str = decodeCharString(encoded);
                i = i + 1 + length;
                t = getToken(); // read in 'NP'
                if (t == 'noaccess')
                  getToken(); // read in 'put'
                program.subrs[index] = str.charstring;
              }
              break;
            case '/BlueValues':
            case '/OtherBlues':
            case '/FamilyBlues':
            case '/FamilyOtherBlues':
            case '/StemSnapH':
            case '/StemSnapV':
              program.properties.privateData[token.substring(1)] =
                readNumberArray(eexecStr, i + 1);
              break;
            case '/StdHW':
            case '/StdVW':
              program.properties.privateData[token.substring(1)] =
                readNumberArray(eexecStr, i + 2)[0];
              break;
            case '/BlueShift':
            case '/lenIV':
            case '/BlueFuzz':
            case '/BlueScale':
            case '/LanguageGroup':
            case '/ExpansionFactor':
              program.properties.privateData[token.substring(1)] =
                readNumber(eexecStr, i + 1);
              break;
          }
        } else if (c == '/') {
          token = glyph = '';
          while ((c = eexecStr[++i]) != ' ')
            glyph += c;
        }
      }
    }

    return program;
  };

  this.extractFontHeader = function Type1Parser_extractFontHeader(stream,
                                                                  properties) {
    var headerString = '';
    for (var i = 0, ii = stream.length; i < ii; i++)
      headerString += String.fromCharCode(stream[i]);

    var token = '';
    var count = headerString.length;
    for (var i = 0; i < count; i++) {
      var getToken = function getToken() {
        var character = headerString[i];
        while (i < count && (isSeparator(character) || character == '/'))
          character = headerString[++i];

        var token = '';
        while (i < count && !(isSeparator(character) || character == '/')) {
          token += character;
          character = headerString[++i];
        }

        return token;
      };

      var c = headerString[i];
      if (isSeparator(c)) {
        switch (token) {
          case '/FontMatrix':
            var matrix = readNumberArray(headerString, i + 1);

            // The FontMatrix is in unitPerEm, so make it pixels
            for (var j = 0, jj = matrix.length; j < jj; j++)
              matrix[j] *= 1000;

            // Make the angle into the right direction
            matrix[2] *= -1;

            properties.fontMatrix = matrix;
            break;
          case '/Encoding':
            var encodingArg = getToken();
            var encoding;
            if (!/^\d+$/.test(encodingArg)) {
              // encoding name is specified
              encoding = Encodings[encodingArg];
            } else {
              encoding = [];
              var size = parseInt(encodingArg, 10);
              getToken(); // read in 'array'

              for (var j = 0; j < size; j++) {
                var token = getToken();
                if (token == 'dup') {
                  var index = parseInt(getToken(), 10);
                  var glyph = getToken();
                  encoding[index] = glyph;
                  getToken(); // read the in 'put'
                }
              }
            }
            if (!properties.hasEncoding && encoding) {
              properties.baseEncoding = encoding;
              break;
            }
            break;
        }
        token = '';
      } else {
        token += c;
      }
    }
  };
}