function(results, status) {
                    $this.reset();
                    
                    // Handle errors
                    if (status != google.maps.GeocoderStatus.OK) {
                        if (settings.errorHandler) {
                            settings.errorHandler(results, status);
                            return false;
                        };
                    };
                    
                    // Loop through the results and filter out precision
                    // levels we will not accept.
                    var keep = new Array();
                    $.each(results, function(i, val) {
                        $.each(val.types, function(ii, type) {
                            if (new RegExp(type).test(settings.acceptableAddressTypes.join("|"))) {
                                keep.push(val);
                                return false;
                            }
                        });
                    });
                    
                    // Further filter the results if a function has been provided
                    if (settings.filterResults) {
                        keep = settings.filterResults(keep);
                    };
                    
                    var count = keep.length;
                    if (count === 0) {
                        var ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                        var li = $("<li>")
                            .html(settings.noResultsText)
                            .css({
                                    'cursor': 'pointer',
                                    'margin-left': 0,
                                    'padding': '5px 0 5px 8px',
                                    'list-style-type': 'none',
                                    'text-align': 'left'
                                })
                            .appendTo(ul)
                        ul.appendTo(dropdown);
                        dropdown.show();
                        $("li", dropdown).css("cursor", "default");
                        close.show();
                        close.click($this.reset);
                    } else if (count === 1 && force) {
                        settings.onSelect(results[0]);
                        $this.reset();
                        $this.previousSearch = results[0].formatted_address;
                        input.val(results[0].formatted_address);
                    } else {
                        var ul = $("<ul>").css({'margin': 0, 'padding': 0, 'background-color': 'white'});
                        $.each(keep, function(i, val) {
                            $('<li>')
                                .html(val.formatted_address)
                                .css({
                                    'cursor': 'pointer',
                                    'margin-left': 0,
                                    'padding': '5px 0 5px 8px',
                                    'list-style-type': 'none',
                                    'font-size': settings.fontSize,
                                    'text-align': 'left'
                                })
                                .click(function(){
                                    settings.onSelect(val);
                                    $this.reset();
                                    $this.previousSearch = val.formatted_address;
                                    input.val(val.formatted_address);
                                })
                                .hover(
                                    function() { 
                                        $(this).css({'background-color': '#EEE', 'cursor': 'pointer'});
                                    },
                                    function() {
                                        $(this).css({'background-color': 'white', 'cursor': 'auto'});
                                    })
                                .appendTo(ul);
                        });
                        ul.appendTo(dropdown);
                        dropdown.show();
                        close.show();
                        close.click($this.reset)
                    }
                }