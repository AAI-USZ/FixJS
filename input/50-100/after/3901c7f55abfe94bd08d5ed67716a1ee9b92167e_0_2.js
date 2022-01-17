function( _this, fun, name, button ) {

            var wrapper = function(ev) {

                // if is a left click

                if ( ev.button === button ) {

                    return fun.call( this, ev );

                }

            };

            

            return ($(_this)[name])( wrapper );

        }