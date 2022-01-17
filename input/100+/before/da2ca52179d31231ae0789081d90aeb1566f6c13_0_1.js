function(data) {



                        // Set general module details

                        dojo.html.set(dojo.byId("orderModuleDetailName"), data.name);

                        dojo.html.set(dojo.byId("orderModuleDetailDescr"), data.description);

                        dojo.html.set(dojo.byId("orderModuleDetailBuild"), data.buildtime);

                        dojo.html.set(dojo.byId("orderModuleDetailDelivered"), data.delivered);



                        // Build child module list

                        dojo.empty("orderDetailsChildren");

                        var ul = dojo.byId("orderDetailsChildren");

                        dojo.forEach(data.childModules, function(item) {

                            var node = dojo.create("li", {innerHTML: item.name}, ul);

                        });



                        // Build component list for this

                        var componentTable = dojo.query(".orderModuleComponentTable")[0];

                        var refNode = dojo.clone(componentTable);

                        var headerNode = dojo.query(".tableHeader", componentTable)[0];

                        var subTotal = 0;

                        dojo.forEach(data.components, function(item){

                            var total = item.local_price * item.amount;

                            dojo.place("<tr><td>" + item.amount +"x </td><td>" + item.catalog_number + " :: " + item.description +"</td><td style=\"text-align: right\">" + total + " NOK</td></tr>", headerNode, "after");

                            subTotal += total;

                        });

                        dojo.html.set(dojo.query(".orderModuleCompPrice", componentTable)[0], subTotal + " NOK");

                    }