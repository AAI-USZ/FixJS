function() {
            var data = $(this).data();
            target = targets = $('.has-tip'),
            tip = $(this),
            classes = tip.attr('class');
            targets.each(function() {
              ($(this).data().id == data.id) ? target = $(this) : target = target;
            });
            methods.reposition(target, tip, classes);
          }