function (e) {
                                        var kc = e.keyCode;
                                        if (kc >= 96 && kc <= 105) kc -= 48; //numpad
                                        kval = parseInt(String.fromCharCode(kc));

                                        if (isNaN(kval)) {

                                            (kc !== 13)      // enter
                                            && (kc !== 8)    // bs
                                            && (kc !== 9)    // tab
                                            && (kc !== 189)  // -
                                            && e.preventDefault();

                                            // arrows
                                            if ($.inArray(kc,[37,38,39,40]) > -1) {
                                                k.change(parseInt($this.val()) + kv[kc] * m);

                                                // long time keydown speed-up
                                                to = window.setTimeout(
                                                        function () { m < 20 && m++; }
                                                        ,50
                                                        );

                                                e.preventDefault();
                                            }
                                        }
                                    }