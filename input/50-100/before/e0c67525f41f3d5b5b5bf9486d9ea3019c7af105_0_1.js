function (attr) {


                    var ctx = ko.utils.arrayFirst(contexts, function(ctx){
                        return ctx.rule.toLowerCase() === attr.toLowerCase();
                    });

                    if (!ctx)
                        return;

                    // we have a rule matching a validation attribute at this point
                    // so lets add it to the element along with the params
                    $el.attr(attr, ctx.params);
                }