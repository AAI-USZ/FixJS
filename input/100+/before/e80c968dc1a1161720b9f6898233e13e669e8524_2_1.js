function init (container) {
        for (var i = 10; i--;) {
            container.append('<div class="box">&nbsp;</div>');
        }

        var e = $('<canvas width="1000" height="1000"/>').appendTo(container);
        var ctx = e.get()[0].getContext("2d");

        for (var i = 180; i > -180; i--) {
            var rad = i * (Math.PI / 180);
            ctx.beginPath();
            ctx.strokeStyle = 'hsla('+i+', 100%, 50%, 0.9)';
            ctx.lineWidth = 3;
            ctx.moveTo(200 + Math.sin(rad) * 120 , 200 + Math.cos(rad) * 120);
            ctx.lineTo(200 + Math.sin(rad) * 40 , 200 + Math.cos(rad) * 40);
            ctx.stroke();
            ctx.closePath();
            //ctx.clearRect(130, 160, 140, 80);

        }    

        var target;
        $(container).find('#stage .box').click(function (event) {
            if (target) {
                $(target).removeClass('focused');    
            }
            $(event.target).addClass('focused');
            target = event.target;
        });

        rch.addEventListener('rcjs:swipe', function (event) {
            e.css({
                display: 'block',
                top: $(target).position().top,
                left: $(target).position().left
            });
            $(target).css('background-color' , 'hsl(' + event.angle + ', 100%, 50%)');
        });

        rch.addEventListener('rcjs:swipeend', function (event) {
            var dir = rch.getDirection(event.angle);
            $(target).css('background-color' , 'hsl(' + event.angle + ', 100%, 50%)');

        });
    }