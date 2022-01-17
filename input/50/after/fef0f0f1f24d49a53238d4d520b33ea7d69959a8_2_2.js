function(v, inst) {
                input.val(v);
                elm.val(inst.values[0].replace(/_/, '')).trigger('change');
            }