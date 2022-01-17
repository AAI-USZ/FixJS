function() {
                            ul.find('li:first').animate(
                                {marginLeft: '-305px'}, 500, function() {
                                    $(this).detach().appendTo(ul).removeAttr('style');
                                });
                            ticker();
                        }