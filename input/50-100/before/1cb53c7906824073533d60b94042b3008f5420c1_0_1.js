function(pair) {
                console.log('pair', pair);
                pair = pair.split('=');
                var name = pair.shift();
                var value = pair.join('=');

                result[ name ] = value.replace(/^"|"$/g, '');
            }