function (options) {
        options = $.extend({}, defaults, options);
        var container = $(options.container);

        if (this.length > options.threshold) {
            var entries = this.map(function () {
                var id  = $(this).attr('id');
                var sid = (id.length > 25) ? (id.slice(0, 22) + ' ...') : id; // sid => short/display id :P
                return '<li><a href="#' + id + '" title="' + id + '">' + sid + '</a></li>';
            });

            var index = $('<ul class="index">' + entries.get().join('') + '</ul>');

            // remove previous index if any
            container.find('.index').remove();
            container.trigger('remove.index');

            // add the new one
            container.append(index);
            container.trigger('add.index', index);
        }
        else {
            // remove previous index if any
            container.find('.index').remove();
            container.trigger('remove.index');
        }

        return this;
    }