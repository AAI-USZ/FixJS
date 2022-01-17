function() { 
            $(this).hide();
            $("#info-button").show();        
            $("#left-page").toggleClass('slide');
            $("#book").toggleClass('hide');
            $("#right-page").toggle();
            $("#canvas-main").toggleClass('page');
            $("#content-scroll").toggleClass('hide', !$("#left-page").hasClass('slide'));
            $("#ui-container").toggleClass('hide', !$("#left-page").hasClass('slide'));
            that.resize();
        }