function(){
                    var value = ""+this;

                    if ($.inArray(value, dt.data[rowuri][property_uri]) === -1){
                        dt.data[rowuri][property_uri].push(value);

                        var innercell = dt.makediv(["innercell"]);
                        cell.append(innercell);
                        innercell.html(value);
                    }
                }