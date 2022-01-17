function() {
        calcWipLimit();
        if(cardLimit && cardLimit > 0) {
            var cardCount = 0;
            $list.find('.list-card').each(function() {
                if($(this).parent().hasClass('card-composer')) return true;    
                cardCount++;
            });
            
            $list.removeClass('over-limit');
            $list.removeClass('at-limit');

            if(cardCount >= cardLimit) {
                if(cardCount == cardLimit) { 
                    $list.addClass('at-limit');
                } else {
                    $list.addClass('over-limit');
                }
            }
        }
    }