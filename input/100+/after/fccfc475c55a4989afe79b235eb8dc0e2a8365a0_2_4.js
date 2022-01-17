function(e) {
                e.stopPropagation();
                var dialog = $('#dialogBox .dialogText');
                var dialogMsg = $('#dialogMsg');
			
                dialog.empty();
                dialogMsg.empty();
                
                dialog.append('<p>Click on a page to establish a hyperlink between this element and the target resource.</p>');
                
                var headers = {};
                headers['X-StructrSessionToken'] = token;
                
                $.ajax({
                    url: rootUrl + 'pages?pageSize=100',
                    async: true,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: headers,
                    success: function(data) {
                        
                        $(data.result).each(function(i, res) {
                            
                            //console.log(entity.id, res.linkingElements);
                            
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
                });
                
                $.ajax({
                    url: rootUrl + 'files/ui?pageSize=100',
                    async: true,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: headers,
                    success: function(data) {
                        $(data.result).each(function(i, res) {
                            
                            console.log(entity.id, res.name, res);
                            
                            dialog.append('<div class="file ' + res.id + '_"><img class="typeIcon" src="' + _Files.getIcon(res) + '">'
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
                });
                
                Structr.dialog('Link to Resource (Page, File or Image)', function() {
                    return true;
                }, function() {
                    return true;
                });
                
            }