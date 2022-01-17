function(pair) {
                pair = pair.split('=');
                result[ pair[0] ] = (pair[1] || '').replace(/^"|"$/g, '');
            }