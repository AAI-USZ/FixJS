function (container) {
        var target; 

        for (var i = 0; ++i < 11;) {
            container.append('<div class="box">Message #' + i + '</div>');
        }

        // var e = $('<canvas width="1000" height="1000"/>').appendTo(container);
        // var ctx = e.get()[0].getContext("2d");
        // for (var i = 180; i > -180; i--) {
        //     var rad = i * (Math.PI / 180);
        //     ctx.beginPath();
        //     ctx.strokeStyle = 'hsla('+i+', 100%, 50%, 0.9)';
        //     ctx.lineWidth = 3;
        //     ctx.moveTo(200 + Math.sin(rad) * 120 , 200 + Math.cos(rad) * 120);
        //     ctx.lineTo(200 + Math.sin(rad) * 40 , 200 + Math.cos(rad) * 40);
        //     ctx.stroke();
        //     ctx.closePath();
        //     //ctx.clearRect(130, 160, 140, 80);
        // }    
        // e.hide();

        function clickHandler (event) {
            if (target) {
                target.removeClass('selected');    
            }
            target = $(event.target);
            target.addClass('selected');

            return false;
        }
        
        $(container).find('.box').click(clickHandler);

        $(container).click(function (event) {
            $(target).removeClass('selected');    
        });

        this.addEventListener('rcjs:pinch', function (event) {
            $(target).css('background-color' , 'hsl(' + event.rotation + ', 100%, 50%)');
        });

        this.addEventListener('rcjs:swipeend', function (event) {
            if (target) {
                var dir = rch.getDirection(event.angle);
                switch (dir) {
                    case 's':
                        var clone = target.clone().click(clickHandler).removeClass('selected');
                        var content = 'Copy of ' + clone.html();
                        target.after(clone.empty().append(content));    
                        break;
                    case 'n':
                        target.remove();
                        break;
                    case 'w':
                        target.addClass('double');
                        break;
                    case 'e':
                        target.removeClass('double');
                        break;
                        
                }     
            }
        });
    }