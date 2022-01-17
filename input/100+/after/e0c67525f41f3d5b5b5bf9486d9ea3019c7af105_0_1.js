function (element, valueAccessor) {

                var observable = valueAccessor();



                if (!observable || !observable.rules) {

                    return;

                }



                var contexts = observable.rules(); // observable array

                var $el = $(element);



                // loop through the attributes and add the information needed

                ko.utils.arrayForEach(html5Attributes, function (attr) {

                    var params;
                    var ctx = ko.utils.arrayFirst(contexts, function (ctx) {
                        return ctx.rule.toLowerCase() === attr.toLowerCase();
                    });

                    if (!ctx)
                        return;

                    params = ctx.params;

                    // we have to do some special things for the pattern validation
                    if (ctx.rule == "pattern") {

                        if (ctx.params instanceof RegExp) {

                            params = ctx.params.source; // we need the pure string representation of the RegExpr without the //gi stuff
                        }
                    }

                    // we have a rule matching a validation attribute at this point
                    // so lets add it to the element along with the params
                    $el.attr(attr, params);
                });

                contexts = null;
                $el = null;
            }