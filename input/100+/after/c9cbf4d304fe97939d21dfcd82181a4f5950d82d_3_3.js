function(query,DropDownDate,json){
                        n = query(".xfValue",node)[0];
                        var xfId = bf.util.getXfId(n);
                        var xfControlDijit = registry.byId(xfId);
                        var dataObj = bf.util.parseDataAttribute(n,"data-bf-params");
                        var dateFormat = dataObj.date;
                        var value = dataObj.value;
                        if(!value) {
                            value = domAttr.get(n,"value");
                        }
                        xfControlDijit.setCurrentValue(value);
                        var dateWidget = new DropDownDate({
                            value:value,
                            dateFormat:dateFormat
                        },n);
                        self._connectControlDijit(xfControlDijit, dateWidget);
                    }