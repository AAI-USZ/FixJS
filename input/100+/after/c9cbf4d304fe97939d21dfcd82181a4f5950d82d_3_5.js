function(controlDijit, node){
                    var n = node;
                    // console.debug("_createDateTime: node value: ",domAttr.get(node,"value"));
                    var xfControlDijit = controlDijit;
                    var controlId =domAttr.get(n,"id");

                    var dataObj = bf.util.parseDataAttribute(n,"data-bf-params");
                    console.debug("createDateTime: dataObj:",dataObj);
                    var tmpValue = dataObj.value;
                    if(!tmpValue) {
                        tmpValue = domAttr.get(n,"value");
                    }
                    // console.debug("FactoryInput._createDateTime: tmpValue:",tmpValue);
                    var xfValue = this._getISODate(tmpValue);
                    // console.debug("FactoryInput._createDateTime: xfValue:",xfValue);

                    xfControlDijit.setCurrentValue(xfValue);
                    var self = this;
                    var xfId = bf.util.getXfId(n);
                    // console.debug("FactoryInput dateTime: id: ", controlId, " xfValue: ",xfValue, " node:",n);
                    require(["bf/input/DateTime"], function(DateTime) {
                        var dateTimeWidget = new DateTime({
                            name:controlId,
                            value:xfValue,
                            xfControlDijit:xfControlDijit,
                            miliseconds:false,
                            appearance:"minimal",
                            dateConstraints:{
                                datePattern:'M/d/yyyy'
                            },
                            timeConstraints:{
                                timePattern:'HH:mm:ss z',
                                clickableIncrement: 'T00:15:00',
                                visibleIncrement: 'T00:15:00',
                                visibleRange: 'T01:00:00'

                            },
                            title:domAttr.get(n, "title"),
                            xfControlId:xfId
                        },n);

                        connect.connect(dateTimeWidget, "set", function (attrName, value) {
                            // console.debug("dateTimeWidget: set attrName:",attrName, " value:",value, " incremental:", xfControlDijit.isIncremental());
                            if((attrName == "focused" &&  !value) || attrName == "value"){
                                if(attrName == "focused"){
                                    xfControlDijit.sendValue(this.get("value"),true);
                                }else if(attrName == "value" && xfControlDijit.isIncremental()) {
                                    xfControlDijit.sendValue(this.get("value"),false);
                                }

                            }else if(attrName == "focused" &&  value){
                                xfControlDijit.handleOnFocus();
                            }
                        });

                        xfControlDijit.setValue = function(value,schemavalue) {
                            // console.debug("FactoryInput._createDateTime xfControlDijit.setValue: ",value,schemavalue );
                            dateTimeWidget.set('value', schemavalue);
                        };

                        self._overwriteReadonly(xfControlDijit, dateTimeWidget);
                    });

                }