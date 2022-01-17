function clickHandler (event) {
            if (target) {
                target.removeClass('selected');    
            }
            target = $(event.target);
            target.addClass('selected');

            return false;
        }