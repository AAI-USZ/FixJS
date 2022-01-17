function (ugens, previousUGens, reattachInputs) {
            // TODO: Unit tests!
            if (reattachInputs) {
                // Note: This algorithm assumes that ugens and previousUGens are the same length.
                previousUGens = $.makeArray(previousUGens);
                ugens = $.makeArray(ugens);
                
                for (var i = 0; i < previousUGens.length; i++) {
                    var prev = previousUGens[i],
                        current = ugens[i];
                    for (var input in prev.inputs) {
                        if (current.inputs[input] === undefined) {
                            current.inputs[inputs] = prev.inputs[inputs];
                        }
                    }
                }
            }
            that.remove(previousUGens);
            that.add(ugens);
        }