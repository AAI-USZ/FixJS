function () {
        var targets, tips, tipTemplate, poll;

        $(window).data('tooltips', 'init');

        targets = $('.has-tip');
        tips = $('.tooltip');
        tipTemplate = function (target, content) {
          return '<span data-id="' + target + '" class="tooltip">' + content + '<span class="nub"></span></span>';
        };
        poll = setInterval(methods.isDomResized, attributes.pollInterval);
        if (tips.length < 1) {
          targets.each(function (i) {
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
          });
        }
        $(window).on('resize.tooltip', function () {
          var tips = $('.tooltip');
          tips.each(function () {
            var data, target, tip, classes;

            data = $(this).data();
            target = targets = $('.has-tip');
            tip = $(this);
            classes = tip.attr('class');
            targets.each(function () {
              ($(this).data().id == data.id) ? target = $(this) : target = target;
            });
            methods.reposition(target, tip, classes);
          });

        });

        if (Modernizr.touch) {
          $('.tooltip').on('click.tooltip touchstart.tooltip touchend.tooltip', function (e) {
            e.preventDefault();
            $(this).fadeOut(150);
          });
          targets.on('click.tooltip touchstart.tooltip touchend.tooltip', function (e) {
            e.preventDefault();
            $('.tooltip').hide();
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          });
        } else {
          targets.hover(function () {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          }, function () {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeOut(150);
          });
        }

      }