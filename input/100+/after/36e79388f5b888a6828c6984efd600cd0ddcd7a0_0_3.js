function( command, control, painter ) {

        var name = control.name,

            type = control.type.toLowerCase(),

             css = control.css,

        callback = control.callback,

           field = control.field;



        if (

                name === undefined ||

                type === undefined ||

                field === undefined

        ) {

            throw new Error( "Invalid Control Given" );

        }



        var defaultField = command[ field ];

        if ( defaultField === undefined ) {

            defaultField = control.value;

            command[ field ] = defaultField;

        }



        var cDom = $('<div>').

                addClass( 'skybrush_control' ).

                addClass( CONTROL_CSS_PREFIX + type );



        // Add CSS class if we have it

        if ( css !== undefined ) {

            cDom.addClass( 'sb_' + css );

        }



        var label = $('<div>').

                addClass('skybrush_command_control_label');

        label.text( name );



        var cssID = controlNameToCSSID( name );



        /*

         * Create the Dom Element based on it's type.

         * All supported types are listed here.

         */

        if ( type == 'checkbox' ) {

            if ( defaultField === undefined ) {

                    defaultField = false;

            }



            var checkbox = $('<input>').

                    attr( 'type', 'checkbox' ).

                    addClass( cssID ).

                    change( function() {

                        var isChecked = $(this).is(':checked')



                        command[ field ] = isChecked;

                        if ( callback ) {

                            callback.call( command, isChecked, painter );

                        }

                    } );



            if ( command[field] ) {

                checkbox.attr( 'checked', 'checked' );

            }



            cDom.

                    append( label ).

                    append( checkbox );

        } else if ( type == 'toggle' ) {

            cDom.append( label );

            var cssStates = control.css_options,

                    names = control.name_options;



            var numOptions =

                    ( cssStates ? cssStates.length :

                    ( names     ? names.length     :

                                  0 ) );



            var option = -1;

            var toggle = $('<input>').

                    addClass( 'skybrush_input_button' ).

                    addClass( cssID ).

                    attr( 'type', 'button' );

            var switchOption = function() {

                if ( cssStates && cssStates[option] ) {

                    toggle.removeClass( cssStates[option] );

                }



                option = (option+1) % numOptions;

                if ( names ) {

                    toggle.val( names[option] );

                }

                if ( cssStates && cssStates[option] ) {

                    toggle.addClass( cssStates[option] );

                }

            };



            switchOption();



            toggle.click( function(ev) {

                    ev.stopPropagation();

                    ev.preventDefault();

                    switchOption();



                    command[ field ] = option;

                    if ( callback ) {

                        callback.call( command, option, painter );

                    }

            } );



            cDom.append( toggle );

        } else if ( type == 'slider' ) {

            if ( defaultField === undefined ) {

                defaultField = 1;

            }



            var min = control.min,

                max = control.max;



            var val = $('<input>').

                    addClass( 'skybrush_input' ).

                    forceNumeric( false ).

                    keydown( function() {

                        var $this = $(this);



                        setTimeout( function() {

                            var n = $this.val();



                            if ( n && n >= 1 ) {

                                n = Math.round( n );

                                slider.setSlide( n / max );



                                command[ field ] = n;



                                if ( callback ) {

                                    callback.call( command, n, painter );

                                }

                            }

                        }, 0 );

                    } );



            var slider = $slider().

                    addClass( cssID ).

                    limit( min, max ).

                    step( 1 ).

                    slide( function(ev, n, p) {

                        command[ field ] = n;

                        val.val( n );



                        if ( callback ) {

                            callback.call( command, n, painter );

                        }

                    } );



            // initialize

            val.val( defaultField );



            cDom.

                    append( label ).

                    append( val ).

                    append( slider );



            // Slider must be updated in the future,

            // after the reflow.

            setTimeout( function() {

                slider.setSlide( defaultField / max );

            }, 0 );

        } else {

            throw new Error( "Unknown control setup given" );

        }



        return cDom;

    }