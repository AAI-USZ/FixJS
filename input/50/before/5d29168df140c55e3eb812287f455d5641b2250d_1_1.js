function() {
                        if (lastHash !== window.location.hash) {
                            $win.trigger(hashevt);
                            lastHash = window.location.hash;
                        }
                    }