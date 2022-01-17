function (ugens, recursively) {
            var i,
                ugen,
                all,
                idx,
                inputs,
                input;
            
            ugens = $.makeArray(ugens);
            for (i = 0; i < ugens.length; i++) {
                ugen = ugens[i];
                all = that.active;
                idx = all.indexOf(ugen);
                if (idx > -1) {
                    all.splice(idx, 1);
                }
                if (ugen.id) {
                    delete that.named[ugen.id];
                }
                if (recursively) {
                    inputs = [];
                    for (input in ugen.inputs) {
                        inputs.push(ugen.inputs[input]);
                    }
                    that.remove(inputs, true);
                }
            }
        }