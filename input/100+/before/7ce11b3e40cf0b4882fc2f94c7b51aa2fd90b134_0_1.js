function() {
                            var $input = $(this), input = this;
                            if ($input.data('inputmask')) {
                                tests = $input.data('inputmask')['tests'];
                                _buffer = $input.data('inputmask')['_buffer'];
                                opts.greedy = $input.data('inputmask')['greedy'];
                                opts.repeat = $input.data('inputmask')['repeat'];
                                opts.definitions = $input.data('inputmask')['definitions'];
                                //writeout the unmaskedvalue
                                input._valueSet(unmaskedvalue($input, true));
                                //clear data
                                $input.removeData('inputmask');
                                //unbind all events
                                $input.unbind(".inputmask");
                                $input.removeClass('focus.inputmask');
                                //restore the value property
                                if (Object.getOwnPropertyDescriptor)
                                    var valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                if (valueProperty && valueProperty.get) {
                                    if (input._valueGet) {
                                        Object.defineProperty(input, "value", {
                                            get: input._valueGet,
                                            set: input._valueSet
                                        });
                                    }
                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                    if (input._valueGet) {
                                        input.__defineGetter__("value", input._valueGet);
                                        input.__defineSetter__("value", input._valueSet);
                                    }
                                }
                                delete input._valueGet;
                                delete input._valueSet;
                            }
                        }