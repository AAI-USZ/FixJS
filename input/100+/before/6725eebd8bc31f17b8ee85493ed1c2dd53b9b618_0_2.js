function(){
                    $(this.el).html('<span class="text">Currently selected: <span class="data"></span></span>');
                    // Trigger update when model data changes.
					this.model.on('change:data', this.onDataChange, this);

                    // Get data when parameters change.
                    if (this.model.getData){

                        // helper function to get a timeout getData function.
                        var _timeoutGetData = function(){
                            var delay = 500;
                            return setTimeout(function(){
                                //console.log("getData", model.id, arguments);
                                model.getData();
                                model.set('_fetch_timeout', null);
                            }, delay);
                        };

                        this.model.on('change:primary_filters change:base_filters change:quantity_field', function(){

                            // We delay the get data call a little, in case multiple things are changing.
                            // The last change will get executed.
                            var fetch_timeout = model.get('_fetch_timeout');
                            // If we're fetching, clear the previous fetch.
                            if (fetch_timeout){
                                clearTimeout(fetch_timeout);
                            }
                            // Start a new fetch.
                            model.set('_fetch_timeout', _timeoutGetData(arguments));
                        });
                    }
				}