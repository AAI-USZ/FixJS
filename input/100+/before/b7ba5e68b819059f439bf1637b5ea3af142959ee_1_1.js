function(str, limit) {
            log('String', 'truncateAtWordBoundaries');

            var bits, i;

            if (typeof str !== 'string') {
                return '';
            }

            bits = str.split('');

            if (bits.length > limit) {
                for (i = bits.length - 1; i > -1; --i) {
                    if (i > limit) {
                        bits.length = i;
                    } else if (' ' === bits[i]) {
                        bits.length = i;
                        break;
                    }
                }
                bits.push(' ...');
            }

            return bits.join('');
        }