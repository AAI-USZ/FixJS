function(i, prop) {
                    var sum = (start[prop]||0) - (delta[prop]||0);
                    if (sum && sum >= 0)
                        style[prop] = sum || null;
                }