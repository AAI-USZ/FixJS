function(inst) {
        var s = $.extend({}, defaults, inst.settings),
            elm = $(this),
            id = this.id + '_dummy',
            l1 = $('label[for="' + this.id + '"]').attr('for', id),
            l2 = $('label[for="' + id + '"]'),
            label = l2.length ? l2.text() : elm.attr('name'),
            invalid = [],
            w = [{}];

        w[0][label] = {};

        var main = w[0][label];

        $('option', elm).each(function() {
            var v = $(this).attr('value');
            main['_' + v] = $(this).text();
            if ($(this).prop('disabled')) invalid.push(v);
        });

        $('#' + id).remove();

        var input = $('<input type="text" id="' + id + '" value="' + main['_' + elm.val()] + '" class="' + s.inputClass + '" readonly />').insertBefore(elm);

        if (s.showOnFocus)
            input.focus(function() { inst.show() });

        elm.hide().closest('.ui-field-contain').trigger('create');

        return {
            width: 200,
            wheels: w,
            headerText: false,
            formatResult: function(d) {
                return main[d[0]];
            },
            parseValue: function() {
                return ['_' + elm.val()];
            },
            validate: function(dw) {
                $.each(invalid, function(i, v) {
                    $('li[data-val="_' + v + '"]', dw).removeClass('dw-v');
                });
            },
            onSelect: function(v, inst) {
                input.val(v);
                elm.val(inst.values[0].replace(/_/, '')).trigger('change');
            },
            onChange: function(v, inst) {
                if (s.display == 'inline') {
                    input.val(v);
                    elm.val(inst.temp[0].replace(/_/, '')).trigger('change');
                }
            },
            onClose: function() {
                input.blur();
            }
        }
    }