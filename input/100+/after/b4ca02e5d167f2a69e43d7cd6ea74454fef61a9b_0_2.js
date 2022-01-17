function(index, value) {
            
            var searchable = $(value);
            //First let's add a search bar and make sure this object has relative positioning.
            searchable.css({
                'position': 'relative',
                'box-sizing': 'border-box',
                '-ms-box-sizing': 'border-box',
                '-webkit-box-sizing': 'border-box',
                '-moz-box-sizing': 'border-box',
                'height':   settings.height
                
            });
            
            
            
            // -- Add a master search list -- //
            //Having a master list then grabbing from it eliminated a lag issue that occured if I just hid elements that weren't being used.
            var master_list = $('<div class="widget_searchable_master_list"></div>').css('display', 'none');
            
            //Get all elements and add to master list.
            searchable.children().clone(true, false).appendTo(master_list);

            //Mark non-searchable as 'dead'
            master_list.children().not(settings.searchable_class).addClass('widget_searchable_dead');
        
            //Apply classes to each of the elements in the searchable list.
            searchable.children().addClass('widget_searchable_element');
        
            //Build the searchbar.
            var searchbar = $("<div>" + settings.search_label + " <input type='textarea'/></div>");
            searchbar.children('input').keyup(function() {
            
                var searchtext = $(this).val();
                //If a string starts with colon it will look for EXACTLY that string.
                var isExactly = searchtext.charAt(0) == ':';
            
                searchable.children('.widget_searchable_element').remove();
                master_list.children().each(function(index, value) {
                
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

                });
            });
        
        
            //Get position
            searchbar.css({
                'position' : 'absolute',
                'left' : '0px',
                'width': '100%',
                'background-color' : settings.background_color,
                'text-align' : 'center',
                'cursor' : 'default'
            });
            searchbar.children("input").css('cursor', 'text');

            //Attach the searchbar.
            var searchbarHeight = searchbar.css('visibility', 'hidden').appendTo('body').height();
            
            searchbar.bind('resize', function() {
                alert($(this).height()); 
            });
            
            searchbar.appendTo(searchable).css('visibility', 'visible');
            if(settings.bar_location == 'top'){
                searchbar.css('top' , 0);
                searchable.scroll(function(event) {
                    searchbar.css('top', '' + searchable.scrollTop() + 'px');                
                });
                searchable.css('padding-top', searchbarHeight);
            } else if (settings.bar_location == 'bottom') {
                searchbar.css('bottom' , 0);
                searchable.scroll(function(event) {
                    searchbar.css('bottom', '-' + searchable.scrollTop()+ 'px');                
                });
                searchable.css('padding-bottom', searchbarHeight);
            } else {
                throw "Not a valid position.";
            }
            
            searchbar.css({
                'white-space' : 'nowrap',
                'overflow' : 'hidden'
            });

        }