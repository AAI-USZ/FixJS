function (e) {

                    var params = window.location.hash.substr(1).split('/');

                    if (params[0] == '') {
                        params[0] = '/';
                    }

                    var path = metaproject.routes[params[0]];
                    if (undefined != path) {
                        if (typeof(path) == 'string') {

                            var src = jQuery(path);

                            if(src.length > 0) {
                                // If its an element, get the relative DOM node
                                // TODO data('loaded') is an ugly hack
                                main_content.data('loaded', path).html(src.html());
                            }
                            else {
                                if(metaproject.debug) {
                                    path = path + '?' + new Date().time;
                                }

                                main_content.include(path);
                            }
                        }
                    }
                    else {
                        main_content.text('non ecsiste');
                    }
                }