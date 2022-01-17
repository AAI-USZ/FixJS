function(options) {
                // Merge together the options from the uiConfig and the attribute itself with the onChange event above.
                options = angular.extend({}, options, uiConfig.codemirror);

                // We actually want to run both handlers if the user has provided their own onChange handler.
                var userOnChange = options.onChange;
                if ( userOnChange ) {
                    options.onChange = function(ed) {
                        onChangeHandler(ed);
                        userOnChange(ed);
                    };
                } else {
                    options.onChange = onChangeHandler;
                }

                // If there is a codemirror widget for this element already then we need to unwire if first
                if ( codemirror ) {
                    codemirror.toTextArea();
                }
                // Create the new codemirror widget
                codemirror = CodeMirror.fromTextArea(elm[0], options);
            }