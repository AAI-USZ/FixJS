function() { 
            $(this).hide();
            $("#fullscreen-button").show();
            $("#page").toggleClass('slide');
            $("#book").toggleClass('hide');
            $("#right-page").toggle();
            $("#canvas-main").toggleClass('page');
            $("#content-scroll").toggleClass('hide', !$("#page").hasClass('slide'));
            $("#ui-container").toggleClass('hide', !$("#page").hasClass('slide'));
            that.resize();
        }