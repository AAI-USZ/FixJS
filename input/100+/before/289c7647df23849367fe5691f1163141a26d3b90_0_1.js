function() {
        calcWipLimit();
        if(cardLimit && cardLimit > 0) {
            var cardCount = $list.find('.list-card').size();
            if(cardCount > cardLimit) {
                $list.addClass('over-limit');
            } else {
                $list.removeClass('over-limit');
            }
        }
    }