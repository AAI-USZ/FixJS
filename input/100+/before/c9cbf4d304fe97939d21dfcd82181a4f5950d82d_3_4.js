function(query,DateTextBox){
                        n = query(".xfValue",node)[0];
                        // console.debug("found date value node: n:",n);
                        var xfId = bf.util.getXfId(n);
                        var xfControlDijit = registry.byId(xfId);

                        var dataObj = bf.util.parseDataAttribute(n,"data-bf-params");
                        var datePattern = dataObj.date;
                        if(!datePattern || datePattern == ""){
                            datePattern = "MM/dd/yyyy"
                        }
                        // console.debug("input type=date datePattern:",datePattern);
                        var value = dataObj.value;
                        xfControlDijit.setCurrentValue(value);
                        var dateWidget = new DateTextBox({
                                value:new Date(value),
                                required:false,
                                constraints:{
                                    selector:'date',
                                    datePattern:datePattern
                                } },n);
                        dateWidget.validate = function(/*Boolean*/ isFocused){ return true; };
                        self._connectControlDijit(xfControlDijit, dateWidget);
                    }