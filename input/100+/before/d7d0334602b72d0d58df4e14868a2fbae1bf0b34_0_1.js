function(scope) {
            
            var first,last,perPage,nbPage,i,$t;
            
            /*
             * Hide all tabs except rastertab
             */
            $('.vtab', scope.$d).hide();
            
            /*
             * Maximum number of tabs per page
             */
            perPage = Math.round((2 * msp.$container.width() / 3) / 200);
            
            /*
             * Check that page is not greater that number of page
             * (cf. needed if resizing window when not on page 0)
             */
            nbPage = Math.ceil((scope.items.length - 1) / perPage) - 1;
            if (scope.page > nbPage) {
                scope.page = nbPage;
            }
            /*
             * hide paginator if not needed
             */
            if (nbPage === 0) {
                $('.ptab', scope.$d).hide();
            }
            else {
                $('.ptab', scope.$d).show();
            }
            
            /*
             * Get the first tab in the current page
             */
            first = perPage * scope.page;
            
            /*
             * Get the last tab in the current page
             * 
             * Note: the last elements is the rasterItem tab which is not part of the
             * processed tabs - that's why we remove 1 from the tabs list length
             */
            last = Math.min(first + perPage - 1, scope.items.length - 1);
            
            /*
             * Set first item position right to the paginator
             */
            if (scope.items[first] && scope.items[first].id !== scope.rasterItem.item.id) {
                scope.items[first].$tab.css({
                    left:scope.$next.is(':visible') ? scope.$next.position().left + scope.$next.outerWidth() : 20
                }).show();
            }
            
            /*
             * Tab position is computed from the first to the last index in the page
             */
            for (i = first + 1; i <= last; i++) {
                $t = scope.items[i-1].$tab;
                if (scope.items[i].id === scope.rasterItem.item.id) {
                    continue;
                }
                scope.items[i].$tab.css({
                    left:$t.position().left + $t.outerWidth() + 10
                }).show();
            }
            
        }