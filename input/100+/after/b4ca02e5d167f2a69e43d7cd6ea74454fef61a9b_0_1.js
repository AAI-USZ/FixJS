function(index, value) {
                
                    //Check the searchable type.
                    var searchable_string = '';
                    if(settings.type == 'html') {
                        searchable_string = $(value).html();
                    } else if (settings.type == 'attr') {
                        searchable_string = $(value).attr(settings.searchable_attr);
                    } else if (settings.type == 'function') {
                        searchable_string = settings.searchable_function($(value));
                    } else {
                        throw "type not recognized";
                    }
                
                    //Add all nonsearchable no matter what.
                    if($(value).hasClass('widget_searchable_dead')) {
                        //Only show dead elements if there is no searchtext.
                        if(searchtext == '') {
                            //Note: searchable_element class is only used so I know to remove this class when a new search started.
                            $(value).clone(true, false).removeClass('widget_searchable_dead').addClass('widget_searchable_element').appendTo(searchable);
                        }
                    } else {
                        if(isExactly) {
                            if(searchable_string == searchtext.substring(1)) {
                                $(value).clone(true, false).addClass('widget_searchable_element').appendTo(searchable);
                            }
                        } else {
                            if(searchable_string.toLowerCase().indexOf(searchtext.toLowerCase()) >= 0) {
                                $(value).clone(true, false).addClass('widget_searchable_element').appendTo(searchable);
                            }
                        }
                    }

                }