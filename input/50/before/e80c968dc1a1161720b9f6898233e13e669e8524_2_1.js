function (event) {
            if (target) {
                $(target).removeClass('focused');    
            }
            $(event.target).addClass('focused');
            target = event.target;
        }