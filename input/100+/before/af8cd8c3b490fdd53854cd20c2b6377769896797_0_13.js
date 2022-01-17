function( e ) {
                            chan.window.find(this).data('hover', 1);
                            rn = info.realname ? '<li>'+info.realname+'</li>' : '';
                            tn = info.typename ? '<li>'+info.typename+'</li>' : '';
                            ico = extension.client.settings['avatarfile'].replace(ru, repl);
                            ico = info.usericon == '0' ? extension.client.settings['defaultavatar'] : ico.replacePArg( '{un}', info.username.toLowerCase() );
                            //<div class="damncri-member">
                            //  <div class="aside-left avatar alt1">
                            //      <a target="_blank" href="http://photofroggy.deviantart.com/">
                            //         <img class="avvie" alt=":iconphotofroggy:" src="http://a.deviantart.net/avatars/p/h/photofroggy.png?1" title="photofroggy">
                            //      </a></div><div class="bodyarea alt1-border"><div class="b pp"><strong>~<a target="_blank" href="http://photofroggy.deviantart.com/">photofroggy</a></strong><div><ul><li>Procrastination is my name...</li></ul></div></div></div></div>
                            pane = '<div class="userinfo" id="'+info.username+'">\
                                <div class="avatar">\
                                    <a class="avatar" target="_blank" href="http://'+info.username+'.'+extension.client.settings['domain']+'/">\
                                        <img class="avatar" alt=":icon'+info.username+':"\
                                        src="'+extension.client.settings['avatarfolder']+ico+'" />\
                                    </a>\
                                </div><div class="info">\
                                <strong>\
                                '+info.symbol+'<a target="_blank" href="http://'+info.username+'.'+extension.client.settings['domain']+'/">'+info.username+'</a>\
                                </strong>\
                                <ul>\
                                    '+rn+tn+'\
                                </ul></div>\
                            </div>';
                            chan.window.append(pane);
                            infobox = chan.window.find('.userinfo#'+info.username);
                            pos = usertag.offset();
                            infobox.css({ 'top': (pos.top - usertag.height()) + 10, 'left': (pos.left - (infobox.width())) - 18 });
                            infobox.hover(function(){
                                chan.window.find(this).data('hover', 1);
                            }, rembox);
                            infobox.data('hover', 0);
                            box = chan.userpanel.find('div.userinfo:not(\'#'+info.username+'\')');
                            box.remove();
                        }