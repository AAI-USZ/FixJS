function(behavior, Dialog){



    // Variable that determine the currently selected item

    var moduleId = undefined;



    // Register listeners on items in the module list

    var loadDetailsDialog = new Dialog({

        title: "Loading module details...",

        content: "Loading module details...",

        style: "width: 400px"

    });

    behavior.add({

        "#orderModuleList ul li":{

            onclick: function(e) {

                e.preventDefault(); // Stop default event handling



                // Fetch information about this object

                moduleId = dojo.attr(e.target, "data-rss-module_id");

                var xhrParam = {

                    url: "?m=ordermgmt&a=moduleJson&suppressHeaders=true&id=" + moduleId,

                    handleAs: "json",

                    preventCache: true,

                    sync: true,

                    load: function(data) {



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



                        // Clear all component tables

                        dojo.forEach(dojo.query(".orderModuleComponentTable"), function(table, num){

                            if(num == 0) {

                                dojo.forEach(dojo.query(".itemLine"), function(line){

                                    dojo.destroy(line, table);

                                });

                            } else dojo.destroy(table);

                        });

                        dojo.forEach(dojo.query("h2", dojo.byId("orderModuleComponentList")), function(node, num){

                            if(num != 0) dojo.destroy(node);

                        });



                        // Build component list for this

                        var componentTable = dojo.query(".orderModuleComponentTable")[0];

                        var refNode = dojo.clone(componentTable);

                        var headerNode = dojo.query(".tableHeader", componentTable)[0];

                        dojo.forEach(data.components, function(item){

                            var total = item.local_price * item.amount;

                            dojo.place("<tr class=\"itemLine\"><td>" + item.amount +"x </td><td>" + item.catalog_number + " :: " + item.description +"</td><td style=\"text-align: right\">" + total + " NOK</td></tr>", headerNode, "after");

                        });

                        dojo.html.set(dojo.query(".orderModuleCompPrice", componentTable)[0], data.modulePrice + " NOK");



                        // Build component lists for all children

                        var lastTable = componentTable;

                        dojo.forEach(data.childModules, function(module){

                            subTotal = 0;

                            componentTable = dojo.clone(refNode);

                            headerNode = dojo.query(".tableHeader", componentTable)[0];

                            dojo.forEach(module.components, function(item){

                                var total = item.local_price * item.amount;

                                dojo.place("<tr><td>" + item.amount +"x </td><td>" + item.catalog_number + " :: " + item.description +"</td><td style=\"text-align: right\">" + total + " NOK</td></tr>", headerNode, "after");

                            });

                            dojo.html.set(dojo.query(".orderModuleCompPrice", componentTable)[0], module.modulePrice + " NOK");

                            dojo.place(componentTable, lastTable, "after");

                            dojo.place("<h2>From " + module.name + ":</h2>", lastTable, "after");

                            lastTable = componentTable;

                        });



                        // Update module total prices

                        dojo.forEach(dojo.query(".orderModuleDetailPrice"), function(node) {

                            dojo.html.set(node, data.totalPrice + " NOK");

                        });



                        // Update file listings

                    },

                    error: function(crap) {

                        alert(crap.message);

                    }

                }

                dojo.xhrGet(xhrParam);

            }

        }

    });

    behavior.apply();

}