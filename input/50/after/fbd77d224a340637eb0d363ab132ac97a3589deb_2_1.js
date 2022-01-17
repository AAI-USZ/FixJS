function(evt){
                        // console.debug("FactoryTrigger: node: ", node, " onclick function. Dispatch Event to: ", parentId, " evt: ", evt);
                        fluxProcessor.dispatchEvent(parentId);
                    }