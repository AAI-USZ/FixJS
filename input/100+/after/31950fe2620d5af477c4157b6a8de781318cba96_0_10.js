function() {
                                    // Clones the element not to disturb the original one
                                    var clone = res.cloneNode(true);

                                    // If the last character is a carriage return or a line feed, IE ignores it in the innerText property
                                    // therefore, we add another non-newline character to preserve it
                                    clone.appendChild(cdoc.createTextNode("."));

                                    var text = clone.innerText;
                                    var isJunkEnded = true;

                                    if (text.indexOf("<!-- Welcome to the Atmosphere Framework.") == -1) {
                                        isJunkEnded = false;
                                    }

                                    if (isJunkEnded) {
                                        var endOfJunk = "<!-- EOD -->";
                                        var endOfJunkLength = endOfJunk.length;
                                        var junkEnd = text.indexOf(endOfJunk) + endOfJunkLength;

                                        text = text.substring(junkEnd);
                                    }
                                    return text.substring(0, text.length - 1);
                                }