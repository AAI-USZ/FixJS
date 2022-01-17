functions.saltdev, function(el, index, list) {
                var modfunc = el.split('.'),
                    mod = modfunc[0],
                    func = modfunc[1];

                this[mod] = this[mod] || [];
                this[mod].push(func);
            }