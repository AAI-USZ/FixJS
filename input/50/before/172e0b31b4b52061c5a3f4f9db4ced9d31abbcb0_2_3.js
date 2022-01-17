function(v, inst) {
                if (s.display == 'inline') {
                    input.val(v);
                    elm.val(inst.temp[0].replace(/_/, '')).trigger('change');
                }
            }