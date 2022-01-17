function(data) {
                        console.log(data.result);
                        $(data.result).each(function(i, res) {
                            
                            dialog.append('<div class="page ' + res.id + '_"><img class="typeIcon" src="icon/page.png">'
                                + '<b class="name_">' + res.name + '</b></div>');
                            
                            var div = $('.' + res.id + '_', dialog);
                            
                            div.on('click', function(e) {
                                e.stopPropagation();
                                Command.link(entity.id, res.id); 
                                $('#dialogBox .dialogText').empty();
                                _Pages.reloadPreviews();
                                $.unblockUI({
                                    fadeOut: 25
                                });                               
                            })
                            .css({
                                cursor: 'pointer'
                            })                            
                            .hover(function() {
                                $(this).addClass('nodeHover');
                            }, function() {
                                $(this).removeClass('nodeHover');
                            });
                            
                            if (isIn(entity.id, res.linkingElements)) {
                                div.addClass('nodeActive');
                            }
                            
                        });

                    }