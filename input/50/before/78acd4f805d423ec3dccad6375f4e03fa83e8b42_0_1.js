function() {
                            if (confirm("Delete selected item?")) {
                                AIRTIME.showbuilder.fnRemove([{
                                    id: data.id,
                                    timestamp: data.timestamp,
                                    instance: data.instance
                                }]);
                            } 
                        }