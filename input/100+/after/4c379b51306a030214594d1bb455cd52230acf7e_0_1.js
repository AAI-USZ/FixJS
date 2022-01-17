function(data) {
                
                html = data.html
                
                var $newCovers = $('.covers', html)
                    .removeClass()
                    .addClass("ajax-content")
                    .hide();
                
                $coversLoading.remove();
                
                $covers.append($newCovers);
                $newCovers.fadeIn();
                setTimeout(function() {
                    $covers.height($newCovers.height());
                }, 100);
                
                $products.find('.pagination,.sort,.applied-filters').remove().end()
                    .prepend($('.sort', html))
                    .prepend($('.applied-filters', html))
                    .append($('.pagination', html));
                
                updateCollections(data);
                updateFilters(data);
                
                if (!no_pushstate && Modernizr.history) {
                    // Add url to the browser history
                    history.pushState(data, null, url);
                }
                
                // Trigger an event so product hover info is refreshed
                $products.trigger("productsRefreshed");
                
                if (success) success();
            }