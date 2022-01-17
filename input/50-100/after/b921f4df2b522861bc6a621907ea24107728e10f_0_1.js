function updateMoveUp(el) {
            var isFirst = this.isFirst();
            if (isFirst) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }