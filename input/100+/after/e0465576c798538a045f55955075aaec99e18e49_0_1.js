function(e, ui) {
                var start = ui.item.data('start'),
                    end = ui.item.index();
                console.log("Stop position from " + start + " to " + end);

                // wir kopieren uns die items
                var items = scope.$get(itemsExpr.expression);

                // loesen das binding auf
                scope.$set(itemsExpr.expression, []);
                scope.$parent.$eval();

                console.log("**** BEFORE: " + dump(items, 1));
                items.splice(end, 0, items.splice(start, 1)[0]);
                console.log("****    AFTER: " + dump(items, 1));


                // setzen das manipulierte item wieder ein
                scope.$set(itemsExpr.expression, items);
                scope.$parent.$eval();


                // HIER DURCH WIRD REIHENFOLGE IM MODELL RICHTIG EINGESTELLT, ABER im UI wieder verstellt
                // QUASI gleichbedeutend: widgetUtils.setValue(scope, itemsExpr, items); // FIXME: hier im eval wird Reihenfolge wieder zurückgesetzt

                // Weitere Lösungsansätze:
                //      (1) DOM Order manipulieren
                //      (2) Array Manipulation mehr in einem angularJS Stil?

                // ~~ TODO: how to solve the timing issues for syncing changed model to update view?
                //setTimeout(function() {
                //    scope.$eval();
                //}, 100);
                // ~~~ DID ALSO not HELP scope.$updateView();
                // include changing the index as part of 'ng:repeat-index' attribute

                //scope.$tryEval(itemsExpr.expression, templateElement);
                // KLAPPT NICHT: e.stopPropagation();

//                console.log("****        AFTER EVAL: " + dump(items, 1));
                //scope.$updateView(); // TODO: makes no difference...
            }