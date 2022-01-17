function() {
                    var $input = $(this), input = this, nptValue = input._valueGet();
                    $input.removeClass('focus.inputmask');
                    if (nptValue != undoBuffer) {
                        $input.change();
                    }
                    if (opts.clearMaskOnLostFocus) {
                        if (nptValue == _buffer.join(''))
                            input._valueSet('');
                        else { //clearout optional tail of the mask
                            clearOptionalTail(input, buffer);
                        }
                    }
                    if ((opts.clearIncomplete || opts.onincomplete) && checkVal(input, buffer, true) != getMaskLength()) {
                        if (opts.onincomplete) {
                            opts.onincomplete.call(input);
                        }
                        if (opts.clearIncomplete) {
                            if (opts.clearMaskOnLostFocus)
                                input._valueSet('');
                            else {
                                buffer = _buffer.slice();
                                writeBuffer(input, buffer);
                            }
                        }
                    }
                }