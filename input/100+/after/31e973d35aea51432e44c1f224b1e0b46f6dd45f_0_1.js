function() {
                    reviewEl.addClass('deleted');
                    if (reviewEl.hasClass('reply')) {
                        var $parent = reviewEl.prev('.review');
                        // If this was a reply, remove the "1 reply" link.
                        $parent.find('.view-reply').remove();
                        // Show "Reply" and "Delete" icons.
                        $parent.find('li.hidden').removeClass('hidden');
                    }
                    $('.notification.box').remove();

                    // If already existing Django message, replace message.
                    var success = $('.success h2');
                    if (success) {
                        success.text(gettext('Your review was successfully deleted!'));
                    } else {
                        $('#page').prepend($('<section class="full notification-box">' +
                            '<div class="success"><h2>' +
                            gettext('Your review was successfully deleted!') +
                            '</h2></div></section>'));
                    }
                }