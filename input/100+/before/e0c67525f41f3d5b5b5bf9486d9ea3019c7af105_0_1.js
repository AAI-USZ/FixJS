function (element, valueAccessor) {

                var observable = valueAccessor();



                if (!observable || !observable.rules) {

                    return;

                }



                var contexts = observable.rules(); // observable array

                var $el = $(element);



                // loop through the attributes and add the information needed

                ko.utils.arrayForEach(html5Attributes, function (attr) {


                    var ctx = ko.utils.arrayFirst(contexts, function(ctx){
                        return ctx.rule.toLowerCase() === attr.toLowerCase();
                    });

                    if (!ctx)
                        return;

                    // we have a rule matching a validation attribute at this point
                    // so lets add it to the element along with the params
                    $el.attr(attr, ctx.params);
                });

                contexts = null;
                $el = null;
            }