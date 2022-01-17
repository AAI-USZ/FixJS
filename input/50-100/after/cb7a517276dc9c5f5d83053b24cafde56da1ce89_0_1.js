function(err, value) {
                value = parseInt(value, 10);
                var cachedValue = cache.get('potentiometer-gauge');

                if (cachedValue === null || cachedValue !== value) {
                    cache.put('potentiometer-gauge', value);
                    socket.broadcast.emit('/potentiometer-gauge', cache.get('potentiometer-gauge'));
                    socket.emit('/potentiometer-gauge', cache.get('potentiometer-gauge'));
                    console.log( 'potentiometer-gauge reader: ' + value );
                }
            }