function drawTip(tip) {
        var $container = $(document.createElement('div'));
        $container.addClass('tip-container');
        if (tip.direction == 'up') {
            $container.addClass('up');
        }

        var $callout = $(document.createElement('span'));
        $callout.addClass('callout').attr({'tabindex': '0'});
        $callout.css({'left': tip.left, 'top': tip.top});
        $container.append($callout);

        var $tip = $('#' + tip.id);        
        var left = Math.max(tip.left - (tipWidth/2), 0);
        if (left + tipWidth > sceneWidth) {
            left = sceneWidth - tipWidth;
        }
        $tip.data({"left":left, "top":tip.top});
        $tip.css({'left': -999, 'top': 0, 'opacity': 0});
        $container.append($tip);

        var $arrow = $(document.createElement('span'));
        $arrow.addClass('arrow');
        $arrow.css({'left': tip.left, 'top': tip.top, 'opacity': 0});
        $container.append($arrow);

        $tip.removeAttr('id');
        $container.attr('id', tip.id);

        $('#figure').append($container);
    }