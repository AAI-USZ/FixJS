function() {
                        // Do not signal the parent if this method is executed by the unload event handler
                        if (!_abordingConnection) {
                            connector.signal("close");
                            connector.close();
                        }
                    }