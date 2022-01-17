function(xfControlDijit,node){
                    // console.debug("FactoryInput.createInputPlain");
                    /* Overwriten "abstract" API function on XFControl to handle updating of control values */
                    xfControlDijit.setValue = function(value, schemavalue) {
                        // console.debug("FactoryInput._createText xfControlDijit.setValue:",value);
                        domAttr.set(node, "value", value);
                    };

                    /*
                     ###########################################################################################
                     EVENT BINDING
                     ###########################################################################################

                     Widgets are bound to their XFControl via events. Whenever a user changes the value of a control this change
                     must be propagated to its XFControl which will in turn send it to the server whenever appropriate.

                     There must be at least one event handler to notify XFControl of value changes. However it is highly
                     recommended to add two listeners - one to support incremental updates and one for onblur updates. Please
                     be aware that the order of registration can be significant for proper operation.
                     */

                    connect.connect(node,"onkeyup",function(evt){
                        // console.debug("onkeypress",n);
                        if(xfControlDijit.isIncremental()){
                            xfControlDijit.sendValue(node.value,false);
                        }
                    });

                    connect.connect(node,"onblur",function(evt){
                        // console.debug("onblur",n);
                        xfControlDijit.sendValue(node.value,true);
                    });

                    connect.connect(node,"onfocus",function(evt){
                        // console.debug("xf:input text got focus");
                        xfControlDijit.handleOnFocus();
                    });
                    xfControlDijit.setCurrentValue(domAttr.get(node,"value"));

                }