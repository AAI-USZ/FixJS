function(item){

                            var total = item.local_price * item.amount;

                            dojo.place("<tr><td>" + item.amount +"x </td><td>" + item.catalog_number + " :: " + item.description +"</td><td style=\"text-align: right\">" + total + " NOK</td></tr>", headerNode, "after");

                        }