function() {
                            // Show the default message if I have no remaining memberships
                            if ($('#mymemberships_items li:visible').length === 0) {
                                render({
                                    entry: []
                                });
                            }
                        }