function (e) {
                        if(e.keyCode === 27) {
                            $doc.unbind("mouseup.dial mousemove.dial keyup.dial");
                            self.cancel();
                        }
                    }