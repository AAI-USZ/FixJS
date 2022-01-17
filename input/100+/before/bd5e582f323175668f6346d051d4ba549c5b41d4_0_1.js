function(e) {
        if (extClick(e)) return;
        e.preventDefault();
        
        if ($(this).hasClass('disabled')) return;
        $shoppingCartSection.find(".button,.remove-link,.edit-link").addClass("disabled");
        
        if ($shoppingCartSection.find('.unavailable').length > 0) {
            var message = "Some copies in your shopping cart are now unavailable. These copies will not be included in the order.";
            displayNotice(message, "Continue", openOrderDialog)
        }
        else {
            openOrderDialog();
        }
    }