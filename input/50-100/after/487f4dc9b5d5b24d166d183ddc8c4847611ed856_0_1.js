function(i, prop) {
                        var sum = (start[prop]||0) - (delta[prop]||0);
                        if (prop == 'top') {
                            var dh = (delta['height']||0);
                            sum += dh;
                        }
                        if (sum && sum >= 0)
                            style[prop] = sum || null;
                    }