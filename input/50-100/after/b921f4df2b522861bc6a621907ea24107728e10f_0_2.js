function updateMoveDown(el) {
            var isLast = this.isLast();
            if (isLast) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }