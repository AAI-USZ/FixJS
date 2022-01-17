function(i){
            var target = $(this),
            id = 'foundationTooltip' + i,
            content = target.attr('title'),
            classes = target.attr('class');
            target.data('id', id);
            var tip = $(tipTemplate(id, content));
            tip.addClass(classes).removeClass('has-tip').appendTo('body');
            if (Modernizr.touch) {
              tip.append('<span class="tap-to-close">tap to close </span>');
            }
            methods.reposition(target, tip, classes);
            tip.fadeOut(150);
          }