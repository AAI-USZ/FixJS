function (e) {
                        var kc = e.keyCode;
                        kval = parseInt(String.fromCharCode(kc));

                        if (isNaN(kval)) {

                            (kc !== 13)         // enter
                            && (kc !== 8)       // bs
                            && (kc !== 9)       // tab
                            && (kc !== 189)     // -
                            && e.preventDefault();

                            // arrows
                            if ($.inArray(kc,[37,38,39,40]) > -1) {
                                e.preventDefault();
                                
                                var v = parseInt(self.target.val()) + kv[kc] * m;

                                self.options.stopper
                                && (v = Math.max(Math.min(v, self.options.max), self.options.min));

                                self._draw();
                                //self._frame();
                                self.change(v);

                                // long time keydown speed-up
                                to = window.setTimeout(
                                    function () { m < 20 && m++; }
                                    ,30
                                );
                            }
                        }
                    }