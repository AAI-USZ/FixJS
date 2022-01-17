function (ugens) {
            // TODO: Need to recurse over all the inputs and remove them as well.
            var i,
                ugen,
                all,
                idx;
            
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
            }
        }