function (i) {
            var target, tip, id, content, classes;

            target = $(this);
            id = 'foundationTooltip' + i;
            content = target.attr('title');
            classes = methods.inheritable_classes(target);
            target.data('id', id);
            tip = $(tipTemplate(id, content));
            tip.addClass(classes).appendTo('body');
            if (Modernizr.touch) tip.append('<span class="tap-to-close">tap to close </span>');
            methods.reposition(target, tip, classes);
            tip.fadeOut(150);
          }