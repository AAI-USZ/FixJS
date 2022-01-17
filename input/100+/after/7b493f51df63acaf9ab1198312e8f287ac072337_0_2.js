function (e) {
                            for(i = 0; i < e.feature.attributes.form_values.length; i++) {
                                if(e.feature.attributes.form_values[i].name === 'comment') {
                                    var show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                    if(show_list_item.length === 0) {
                                        var username = e.feature.attributes.user;
                                        var anonymous_regexp = new RegExp('T[0-9]+.[0-9]+R[0-9]+.[0-9]+');
                                        if (anonymous_regexp.test(username)) {
                                            username = '';
                                        }
                                        $('ul.feature_comments').prepend('<li class="' +
                                                                     e.feature.id +
                                                                     '">' +
                                                                     e.feature.attributes.form_values[i].value +
                                                                     '<br />' +
                                                                     username +
                                                                     ' ' +
                                                                     $.datepicker.parseDate('yy-mm-dd', e.feature.attributes.time.create_time.split('T')[0]).toDateString() +
                                                                     '</li>');
                                        show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                    }
                                    if(!show_list_item.hasClass('highlight')) {
                                        show_list_item.addClass('highlight');
                                    }
                                    show_list_item.stop(true, true);
                                    show_list_item.fadeIn(750);
                                }
                            }
                        }