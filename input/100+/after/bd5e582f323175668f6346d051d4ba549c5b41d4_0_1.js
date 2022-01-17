function() {
    if (isOldIE()) return;
    var $body = $('body');
    if (!$body.hasClass('store')) return;
    
    // Handle hover popups
    var $hoverInfo = $('<div id="hover-info"></div>').append('<div class="title-box"></div>');
    var $hoverTitle = $('<h3></h3>').appendTo($hoverInfo.find('.title-box'));
    var $hoverCreators = $('<p class="creators"></p>').appendTo($hoverInfo.find('.title-box'));
    var $hoverAge = $('<p class="age"></p>').appendTo($hoverInfo);
    var $hoverDesc = $('<p class="description"></p>').appendTo($hoverInfo);
    var $hoverNew = $('<p class="new">new copies start at <span class="amount"></span>').appendTo($hoverInfo);
    var $hoverNewAmount = $hoverNew.find('.amount');
    var $hoverUsed = $('<p class="used">used copies start at <span class="amount"></span>').appendTo($hoverInfo);
    var $hoverUsedAmount = $hoverUsed.find('.amount');
    var $hoverMoreInfo = $('<a href="#" class="product-link">more info</a>').appendTo($hoverInfo);
    $hoverInfo.hide().appendTo($body);
    
    function setProductHover() {
        $hoverInfo.hide();
        
        $('#products .cover').on('mousemove', trackCursor)
            .hoverIntent(function(e) {
                var $book = $(this).data('hover', true);
                if ($hoverInfo.is(':visible')) {
                    $hoverInfo.stop().fadeOut('fast',function() {
                        showHover ($book);
                    });
                }
                else {
                    showHover($book);
                }
                
            },
            function() {}
        ).on('mouseleave', function() {
            $(this).data('hover', false);
            setTimeout(checkHover, 100);
        });
    }
    
    function trackCursor(e) {
        $(this).data('mouseX', e.pageX).data('mouseY', e.pageY);
    }
    
    var $window = $(window);
    
    function showHover($book, x, y) {
        $hoverTitle.text($book.data('title'));
        $hoverCreators.text($book.data('creators'));
        $hoverAge.text($book.data('age-level'));
        $hoverDesc.text($book.data('description'));
        
        if ($book.data('new-copy-min-price')) {
            $hoverNewAmount.text($book.data('new-copy-min-price'));
            $hoverNew.show();
        }
        else {
            $hoverNew.hide();
        }
        
        if ($book.data('used-copy-min-price')) {
            $hoverUsedAmount.text($book.data('used-copy-min-price'));
            $hoverUsed.show();
        }
        else {
            $hoverUsed.hide();
        }
        
        $hoverMoreInfo.attr('href', $book.find('.product-link:first').attr('href'));
        
        $hoverInfo.data('link', $book);
        $hoverInfo.off('mouseenter mouseleave');
        $hoverInfo.on('mouseenter', function() {
            $book.data('hover', true);
        }).on('mouseleave', function() {
            $book.data('hover', false);
            setTimeout(checkHover, 100); 
        });
        
        var top = $book.data('mouseY') + 10;
        if ((top + $hoverInfo.outerHeight()) > ($window.scrollTop() + $window.height())) {
            top = top - 15 - $hoverInfo.outerHeight();
        }
        var left = $book.data('mouseX') + 10;
        if ((left + $hoverInfo.outerWidth()) > ($window.scrollLeft() + $window.width())) {
            left = left - 15 - $hoverInfo.outerWidth();
        }
        
        $hoverInfo.css({
            opacity: 1,
            top: top + 'px',
            left: left + 'px'
        }).fadeIn();
    }
    
    function checkHover() {
        if ($hoverInfo.data('link') && !$hoverInfo.data('link').data('hover')) {
            $hoverInfo.fadeOut();
        }
    }
    
    setProductHover();
    
    // Set up the hover state when a refreshed event is triggered on the products section
    $('#products').on('productsRefreshed', setProductHover)
    
    // Handle product information popups
    var $bookInfoDialog = $('<section id="book-info-dialog" class="dialog"></section>');
    $bookInfoDialog.dialog({
        position: "center",
        width: 600,
        height: 600,
        autoOpen:false
    });
    
    var $closeButton = $('<a href="#" class="close-button">Close</a>').click(function(e) {
        e.preventDefault();
        $bookInfoDialog.dialog('close');
    });
    var $bookInfoLoading = $('<p class="loading-large"><img alt="" src="/images/loading2.gif" /><br />Loading...</p>');
    
    $body.on('click', '.product-link', function(e) {
        
        // If an unavailable shopping cart copy was clicked on, remove it from the cart
        var $this = $(this);
        if ($this.hasClass("unavailable-copy")) {
            var copy_id = $this.closest('tr').data('id');
            $.post("/shopping_cart.json", {
                _method: "PUT",
                shopping_cart: { remove_copy: copy_id }
            }, function(data) {
                updateShoppingCartCount(data.item_count);
            });
        }
        
        if (extClick(e)) return;
        e.preventDefault();
        
        closeOtherDialogs('book-info-dialog');
        $closeButton.detach();
        
        $bookInfoDialog.empty()
            .append($closeButton)
            .append($bookInfoLoading.show())
            .dialog('open');
        
        $bookInfoLoading.css('top', $bookInfoDialog.height() / 2 - $bookInfoLoading.height() / 2 + 'px');
            
        $.ajax({
            url: this.href,
            type: 'GET',
            dataType: 'html',
            data: {ajax: true},
            success: function(data) {
                var $bookInfo = $('#book-info', data).find('.back-button').remove().end();
                
                $bookInfoLoading.remove();
                $bookInfoDialog.append($bookInfo.hide());
                
                $bookInfo.fadeIn();
                setTimeout(function() {
                    resizeDialog($bookInfoDialog, $bookInfo, true, true);
                }, 50);
            },
            error: function (xhr){
                $bookInfoDialog.dialog("close");
                displayError(xhr);
            }
        });
    });
    
    // Handle 'add to cart' links
    $body.on('click', '.cart .buy-link', function(e) {
        if (extClick(e)) return;
        e.preventDefault();
        
        var $this = $(this)
        var copy_id = $this.closest("tr").data("id");
        var $loading = $('<span class="loading" title="Adding...">Adding</span>');
        $this.replaceWith($loading);
        
        $.ajax({
            url: "/shopping_cart.json",
            data: {
                _method: "PUT",
                shopping_cart: { add_copy: copy_id }
            },
            success: function(data) {
                var $added = $('<span class="added" title="Added to cart">In Cart</span>');
                $loading.replaceWith($added);
                $('<a href="/update_cart?shopping_cart%5Bremove_copy%5D=' + copy_id + '" class="remove-link" title="Remove from cart">Remove</a>')
                    .hide()
                    .insertAfter($added)
                    .fadeIn();
                updateShoppingCartCount(data.item_count);
                $shoppingCartLink.click();
            },
            error: function(xhr) {
                $loading.replaceWith($this);
                displayError(xhr);
            }
        });
    });
    
    // Handle 'remove from cart' links
    $body.on('click', '.cart .remove-link', function(e) {
        if (extClick(e)) return;
        e.preventDefault();
        
        var $removeLink = $(this);
        var $icon = $removeLink.prev('span');
        $removeLink.fadeOut(function() {
            $(this).remove();
        });
        var copy_id = $icon.closest("tr").data("id");
        var $loading = $('<span class="loading" title="Removing...">Removing</span>');
        $icon.replaceWith($loading);
        
        $.ajax({
            url: "/shopping_cart.json",
            data: {
                _method: "PUT",
                shopping_cart: { remove_copy: copy_id }
            },
            success: function(data) {
                var $buyLink = $('<a href="/update_cart?shopping_cart%5Badd_copy%5D=' + copy_id + '" class="buy-link" title="Add to cart">Buy</a>')
                $loading.replaceWith($buyLink);
                updateShoppingCartCount(data.item_count);
            },
            error: function(xhr){
                $loading.replaceWith($icon);
                $removeLink.stop().show().css('opacity', 1).insertAfter($icon);
                displayError(xhr);
            }
        });
    });
    
    /* ------------------- Order dialog ---------------------------*/
    
    var $orderLoading = $bookInfoLoading.clone();
    var $orderDialog = $('<section id="order-dialog" class="dialog"></section>');
    $orderDialog.dialog({
        position: "center",
        width: 600,
        height: 400,
        autoOpen:false
    });
    
    var $orderCloseButton = $('<a href="#" class="close-button">Close</a>').click(function(e) {
        e.preventDefault();
        
        $orderDialog.dialog("close");
    });
    
    /* ---- Order dialog disabled ---- */

     $body.on('click', '.order-button', function(e) {
         if (extClick(e)) return;
         // e.preventDefault();

         /* -- Only close the dialogs present -- */
         closeOtherDialogs('order-dialog');
        
    //     if ($(this).hasClass('disabled')) return;
    //     $shoppingCartSection.find(".button,.remove-link,.edit-link").addClass("disabled");
        
    //     if ($shoppingCartSection.find('.unavailable').length > 0) {
    //         var message = "Some copies in your shopping cart are now unavailable. These copies will not be included in the order.";
    //         displayNotice(message, "Continue", openOrderDialog)
    //     }
    //     else {
    //         openOrderDialog();
    //     }
     });
    
    function openOrderDialog() {
        closeOtherDialogs('order-dialog');
        
        $orderCloseButton.detach();
        $orderDialog.empty()
            .append($orderCloseButton)
            .append($orderLoading.css('opacity',1).show())
            .dialog('open');
        
        $shoppingCartDialog.dialog("option", "position", "center")
        
        $orderLoading.css('top', $orderDialog.height() / 2 - $orderLoading.height() / 2 + 'px');
        
        $.ajax({
            url: '/order',
            type: 'GET',
            dataType: 'html',
            data: {ajax: true},
            success: function(data) {
                var $order = $('#order', data);
                $orderLoading.remove();
                $orderDialog.append($order.hide());
                
                $orderSection = $order;
                $order.fadeIn();
                
                setTimeout(function() {
                    resizeDialog($orderDialog, $order, true, true, function() {
                        $orderDialog.css('height', 'auto');
                    });
                }, 50);
            },
            error: function(xhr) {
                $orderDialog.dialog("close");
                displayError(xhr);
            }
        });
    }
    
    var $orderSection = $('#order');
    
    // Handle next, previous and cancel buttons
    $orderDialog.add($orderSection).on('submit', 'form', function(e) {
        var $form = $(this);
        if ($form.is('#cancel-order') && !$form.closest('.ui-dialog').length) return;
        e.preventDefault();
        
        $orderDialog.find("input[type=submit]").prop("disabled", true);
        
        if ($form.is('#cancel-order')) {
            $orderDialog.dialog("close");
            
            $.ajax({
                url: '/order',
                data: {_method: 'DELETE', ajax: true},
                error: function(xhr) {
                    displayError(xhr);
                }
            });
            return;
        }
        
        var $removedHtml = dialogShowLoading($orderSection, $orderLoading, 'Order');
        
        $.ajax({
            url: '/order',
            dataType: 'html',
            data: $.extend({}, $form.serializeObject(), {ajax: true}),
            success: function(data) {
                dialogSwitchHtml($orderSection, $orderLoading, $('#order', data));
            },
            error: function(xhr) {
                $orderSection.empty().append($removedHtml.contents());
                displayError(xhr);
            }
        });
    })
    
    // Refresh the shopping cart count when the order dialog is closed
    $orderDialog.on("dialogclose", function() {
        $.get('/shopping_cart', { count: true }, function(data) {
            updateShoppingCartCount(data.item_count);
        });
    });
    
    /* ------------------- Shopping cart dialog ---------------------------*/
    
    var $shoppingCartLoading = $bookInfoLoading.clone();
    var $shoppingCartLink = $('#shopping-cart-link');
    var $shoppingCartDialog = $('<section id="shopping-cart-dialog" class="dialog"></section>');
    $shoppingCartDialog.dialog({
        position: "center",
        width: 600,
        height: 400,
        autoOpen:false
    });
    
    var $cartCloseButton = $('<a href="#" class="close-button">Close</a>').click(function(e) {
        e.preventDefault();
        $shoppingCartDialog.dialog('close');
    });
    
    $shoppingCartLink.on('click', function(e) {
        if (extClick(e)) return;
        e.preventDefault();
        
        closeOtherDialogs('shopping-cart-dialog');
        
        $cartCloseButton.detach();
        $shoppingCartDialog.empty()
            .append($cartCloseButton)
            .append($shoppingCartLoading.css('opacity',1).show())
            .dialog('open');
        
        $shoppingCartLoading.css('top', $shoppingCartDialog.height() / 2 - $shoppingCartLoading.height() / 2 + 'px');
        
        $.ajax({
            url: '/shopping_cart',
            type: 'GET',
            dataType: 'html',
            data: {ajax: true},
            success: function(data) {
                var $shoppingCart = $('#shopping-cart', data).find('.back-button').remove().end();
                $shoppingCartLoading.remove();
                $shoppingCartDialog.append($shoppingCart.hide());
                
                $shoppingCartSection = $shoppingCart;
                updateShoppingCartCount($shoppingCart.find('.container').data('count'));
                
                $shoppingCart.fadeIn();
                
                setTimeout(function() {
                    resizeDialog($shoppingCartDialog, $shoppingCart, true, true, function() {
                        $shoppingCartDialog.css('height', 'auto');
                    });
                }, 50);
            },
            error: function(xhr) {
                $shoppingCartDialog.dialog("close");
                displayError(xhr);
            }
        });
    });
    
    // Handle emptying the cart
    var $shoppingCartSection = $('#shopping-cart');
    var $shoppingCartSectionDialog = $shoppingCartSection.add($shoppingCartDialog);
    $shoppingCartSectionDialog.on('click', '#empty-button', function(e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
            return;
        }
        handleShoppingCartButton(e, { empty: true });
    });
    
    // Handle 'remove from cart' links
    $shoppingCartSectionDialog.on('click', '.remove-link', function(e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
            return;
        }
        var copy_id = $(this).closest("tr").data("id");
        handleShoppingCartButton(e, { remove_copy: copy_id });
    });
    
    // Handle changing the number of copies
    $shoppingCartSectionDialog.on('click', '.edit-link', function(e) {
        e.preventDefault();
        if ($(this).hasClass('disabled')) return;
        
        var $this = $(this);
        var copy_id = $this.closest("tr").data("id");
        var $number = $this.siblings(".number");
        var old_number = parseInt($number.text(), 10);
        
        var saveNumber = function() {
            var number = parseInt($textbox.val(), 10);
            if (!number || number < 0) number = 1;
            $textbox.replaceWith($number.text(number));
            $this.show();
            
            $.ajax({
                url: '/shopping_cart.json',
                data: {
                    _method: "PUT",
                    shopping_cart: {
                        change_number: {
                            copy_id: copy_id,
                            number: number
                        }
                    }
                },
                success: function(data) {
                    $shoppingCartSectionDialog.find('.total .amount').text('Rs. ' + data.total);
                },
                error: function(data) {
                    $number.text(old_number);
                }
            });
        };
        
        var $textbox = $('<input type="text" name="number" value="' + old_number + '" />')
            .on('blur', saveNumber);
        
        $number.replaceWith($textbox);
        $textbox.focus();
        $this.hide();
    });
    
    // Generic function to handle each of the shopping cart buttons
    function handleShoppingCartButton(e, params, successFunction) {
        if (extClick(e)) return;
        e.preventDefault();
        
        $shoppingCartSection.find(".button,.remove-link,.edit-link").addClass("disabled");
        
        var $removedHtml = dialogShowLoading($shoppingCartSection, $shoppingCartLoading, 'Shopping Cart');
        
        $.ajax({
            url: '/shopping_cart.json',
            data: {
                _method: "PUT",
                shopping_cart: params,
                get_html: true
            },
            success: function(data) {
                dialogSwitchHtml($shoppingCartSection, $shoppingCartLoading, $('#shopping-cart', data.html));
                updateShoppingCartCount(data.item_count);
                
                if (successFunction) successFunction();
            },
            error: function(xhr) {
                $shoppingCartSection.empty().append($removedHtml.contents());
                displayError(xhr);
            }
        });
    }
    
    // Function to update the shopping cart item count
    function updateShoppingCartCount(count) {
        $shoppingCartLink.html('Your Cart <span class="number">' + count + '</span>');
    }
    
    // To refresh a dialogs HTML
    function dialogShowLoading($section, $loading, heading) {
        var section_height = $section.height();
        
        $section.height(section_height)
            .wrapInner('<div class="js-remove"></div>')
            .append('<h2>' + heading + '</h2>');
        
        var $jsRemove = $section.find('.js-remove')
            .height(section_height)
            .width($section.width())
            .fadeOut(function() {
                $jsRemove.remove();
            });
        
        $loading.hide()
            .appendTo($section)
            .fadeIn();
        
        // Return the removed block of data
        return $jsRemove;
    }
        
    function dialogSwitchHtml($section, $loading, $newSection) {
        $newSection.attr('id', null)
            .removeClass()
            .addClass('ajax-content')
            .hide();
        
        if ($section.closest('.ui-dialog').length > 0)
            $newSection.find('.back-button').remove();
        
        $newSection.find('h2').remove();
        $loading.remove();
        
        $section.append($newSection);
        $newSection.fadeIn();
        setTimeout(function() {
            resizeDialog($section, $newSection);
        }, 50);
    }
}