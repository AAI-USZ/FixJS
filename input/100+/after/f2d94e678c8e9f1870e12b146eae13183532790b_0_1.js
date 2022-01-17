function(val){
                // function to update the href or action attributes with correct pagination value
                // $el: jquery element, attribute: string, value: string
                var updateUrl = function($el, attribute, value){
                    // cache attribute value
                    var attr_value = $el.attr(attribute),
                    // and querystring value for pagination
                        key = 'per=';
                    // if querystring doesn't contains key just append the key at the end
                    if(attr_value.indexOf(key) < 0){
                        // if no querystring at all add the ?
                        key = (attr_value.indexOf('?') < 0) ? key = '?'+key : '&'+key;
                        // change the attribute
                        $el.attr(attribute, attr_value + key + value);
                    }
                    // otherwise use regular expression to change the value
                    else{
                        attr_value = attr_value.replace(
                            new RegExp(
                                "(per=)(\\d+)"
                           ), "$1" + value
                        )
                        $el.attr(attribute, attr_value);
                    }
                }
                // update each pagination link
                $(this.links).each(function(i, el){
                    updateUrl($(el), 'href', val);
                    // trigger click
                    $('#access_points_paginate .page a').eq(0).trigger('click');
                });
                // if form is defined
                if(this.form){
                    // update action
                    updateUrl($(this.form), 'action', val);
                }
            }