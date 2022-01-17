function() {
                        if (lastHash !== window.location.hash) {
                            $win.trigger(evt);
                            lastHash = window.location.hash;
                        }
                    }