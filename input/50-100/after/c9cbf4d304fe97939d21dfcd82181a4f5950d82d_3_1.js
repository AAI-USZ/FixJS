function(evt){
                        var value = widget.value;
                        if(type == "dateTime"){
                            value = self._getISODateTime(value);
                        }else if(type=="time"){
                            value = self._getMobileTime(value);
                        }
                        // console.debug("send: (keyup)"+ value);
                        // console.debug("dateTime.send: (blur) "+ value);
                        xfControlDijit.sendValue(value, true);
                    }