function(e) {
                e.stopPropagation();
                Structr.dialog('Access Control and Visibility', function() {}, function() {});
                var dt = $('#dialogBox .dialogText');

                dt.append('<h3>Owner</h3><p class="ownerSelectBox" id="ownersBox"></p>');
                
                var element = $('#ownersBox');
                
                element.append('<span class="' + entity.id + '_"><select class="ownerId_" id="ownerIdSelect">');
                
                var ownerIdSelect = $('#ownerIdSelect');
                var headers = {};
                headers['X-StructrSessionToken'] = token;
                $.ajax({
                    url: rootUrl + 'users/all?pageSize=100',
                    async: false,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: headers,
                    success: function(data) {
                        $(data.result).each(function(i, user) {
                            console.log(user);
                            ownerIdSelect.append('<option value="' + user.id + '">' + user.name + '</option>');
                        });
                    }
                });                
                
                element.append('</select></span>');
                
                Command.getProperty(entity.id, 'ownerId', '#dialogBox');
                var select = $('#ownerIdSelect', element);
                select.on('change', function() {
                    Command.setProperty(entity.id, 'ownerId', select.val());
                });                
                
                dt.append('<h3>Visibility</h3><div class="' + entity.id + '_"><button class="switch disabled visibleToPublicUsers_">Public (visible to anyone)</button><button class="switch disabled visibleToAuthenticatedUsers_">Authenticated Users</button></div>');
                var publicSwitch = $('.visibleToPublicUsers_');
                var authSwitch = $('.visibleToAuthenticatedUsers_');

                Command.getProperty(entity.id, 'visibleToPublicUsers', '#dialogBox');
                Command.getProperty(entity.id, 'visibleToAuthenticatedUsers', '#dialogBox');

                if (debug) console.log(publicSwitch);
                if (debug) console.log(authSwitch);

                publicSwitch.on('click', function(e) {
                    e.stopPropagation();
                    if (debug) console.log('Toggle switch', publicSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToPublicUsers', publicSwitch.hasClass('disabled'));
                });

                authSwitch.on('click', function(e) {
                    e.stopPropagation();
                    if (debug) console.log('Toggle switch', authSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToAuthenticatedUsers', authSwitch.hasClass('disabled'));
                });

            }