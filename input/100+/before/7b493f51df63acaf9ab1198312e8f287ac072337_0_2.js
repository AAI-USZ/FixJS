function (e) {
                            for(i = 0; i < e.feature.attributes.form_values.length; i++) {
                                if(e.feature.attributes.form_values[i].name == 'comment') {
                                    var show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                    if(show_list_item.length === 0) {
                                        $('ul.feature_comments').prepend('<li class="' +
                                                                     e.feature.id +
                                                                     '">' +
                                                                     e.feature.attributes.form_values[i].value +
                                                                     '<br />' +
                                                                     $.datepicker.parseDate('yy-mm-dd', e.feature.attributes.time.create_time.split('T')[0]).toDateString() +
                                                                     '</li>');
                                    show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                }
                                show_list_item.fadeIn(750);
                            }
                        }
                    }