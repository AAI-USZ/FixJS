function keypressEvent(e) {
                    //Safari 5.1.x - modal dialog fires keypress twice workaround
                    if (skipKeyPressEvent) return false;
                    skipKeyPressEvent = true;

                    var input = this;

                    e = e || window.event;
                    var k = e.which || e.charCode || e.keyCode;
                    
                    if (opts.numericInput && k == opts.radixPoint.charCodeAt(opts.radixPoint.length - 1)) {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint[opts.radixPoint.length - 1]);
                        caret(input, seekNext(buffer, radixPosition != -1 ? radixPosition : getMaskLength()));
                    }
                    
                    if (e.ctrlKey || e.altKey || e.metaKey || ignorable) {//Ignore
                        return true;
                    } else {
                        if (k) {
                            var pos = caret(input), c = String.fromCharCode(k), maskL = getMaskLength();
                            clearBuffer(buffer, pos.begin, pos.end);
                            
                            if (isRTL) {
                                var p = opts.numericInput ? pos.end : seekPrevious(buffer, pos.end), np;
                                if ((np = isValid(p == maskL || getBufferElement(buffer, p) == opts.radixPoint[opts.radixPoint.length - 1] ? seekPrevious(buffer, p) : p, c, buffer, false)) !== false) {
                                    if (np !== true) {
                                        p = np.pos || pos; //set new position from isValid
                                        c = np.c || c; //set new char from isValid
                                    }
                                    if (isValid(firstMaskPos, buffer[firstMaskPos], buffer, true) == false || (opts.greedy === false && buffer.length < maskL)) {
                                        if (buffer[firstMaskPos] != getPlaceHolder(firstMaskPos) && buffer.length < maskL) {
                                            var offset = prepareBuffer(buffer, -1, isRTL);
                                            if (pos.end != 0) p = p + offset;
                                            maskL = buffer.length;
                                        }
                                        shiftL(firstMaskPos, opts.numericInput ? seekPrevious(buffer, p) : p, c);
                                        writeBuffer(input, buffer, opts.numericInput && p == 0 ? seekNext(buffer, p) : p);
                                    } else if (opts.oncomplete && IsComplete(input))
                                        opts.oncomplete.call(input);
                                } else if (android) writeBuffer(input, buffer, pos.begin);
                            }
                            else {
                                var p = seekNext(buffer, pos.begin - 1), np;
                                prepareBuffer(buffer, p, isRTL);
                                if ((np = isValid(p, c, buffer, false)) !== false) {
                                    if (np !== true) {
                                        p = np.pos || p; //set new position from isValid
                                        c = np.c || c; //set new char from isValid
                                    }
                                    if (opts.insertMode == true) {
                                        var lastUnmaskedPosition = getMaskLength();
                                        var bfrClone = buffer.slice();
                                        while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(buffer, lastUnmaskedPosition);
                                        }
                                        if (lastUnmaskedPosition >= p)
                                            shiftR(p, buffer.length, c);
                                        else return false;
                                    }
                                    else setBufferElement(buffer, p, c);
                                    var next = seekNext(buffer, p);
                                    writeBuffer(input, buffer, next);

                                    if (opts.oncomplete && IsComplete(input))
                                        opts.oncomplete.call(input);
                                } else if (android) writeBuffer(input, buffer, pos.begin);
                            }
                            return false;
                        }
                    }
                }