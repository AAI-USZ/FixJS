function (binding) {
                var el = $(this)
                  , ns = binding.namespace ? '.' + binding.namespace : ''

                  , data = binding.data
                  , onKeyDown    = data.onDown  || function () {}
                  , onShortPress = data.onShort || function () {}
                  , reqPressLen  = data.length  || 300 // Default

                  , keyPressed   = false
                  , timerRunning = false
                  , keyCode      = null
                  ;

                // Bind the events: (keydown|keypress) and keyup.
                el.on( type   + ns, down);
                el.on('keyup' + ns,  up );

                function down(e) {

                    // Keydown auto-repeats; only run on first trigger
                    if (keyPressed === false) {

                        onKeyDown(); // Execute pre-delay callback

                        // Store the keycode to ensure down
                        // and up handlers use the same key.
                        keyCode = e.which;

                        keyPressed = timerRunning = true;

                        setTimeout(function () {
                            timerRunning = false;

                            // If the key is still pressed when the
                            // timer expires, fire the custom event.
                            if (keyPressed) el.trigger(customEvent + ns);

                        }, reqPressLen); // Defaults to 300
                    }

                    return false;
                }

                function up(e) {

                    // Make sure the released key is the same as used by 'down'
                    if (e.which === keyCode) {

                        // If the timer is still running when the key
                        // is released, execute the fallback function.
                        if (timerRunning) onShortPress();

                        keyPressed = false;
                        keyCode = null;
                    }

                    return false;
                }
            }