function(e, ui) {
                var start = ui.item.data('start'),
                    end = ui.item.index();
                console.log("Stop position from " + start + " to " + end);

                var items = scope.$get(itemsExpr.expression);
                console.log("**** BEFORE: " + dump(items, 1));
                items.splice(end, 0, items.splice(start, 1)[0]);
                console.log("****   AFTER: " + dump(items, 1));
                // ~~ TODO: how to solve the timing issues for syncing changed model to update view?
                //setTimeout(function() {
                //    scope.$eval();
                //}, 100);
                // ~~~ DID ALSO not HELP scope.$updateView();
                // include changing the index as part of 'ng:repeat-index' attribute
                scope.$eval();
                console.log("****        AFTER EVAL: " + dump(items, 1));
                //scope.$updateViews(); // TODO: makes no difference...
            }