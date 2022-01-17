function() {

            if(GM_addStyle) {

                return function(css) {

                    GM_addStyle(css)

                    return this

                }

            } else {

                return function(css) {

                    $.create('style').prop({

                        'type' : 'text/style'

                    }).insert(head).html(css)

                    return this

                }

            }

        }