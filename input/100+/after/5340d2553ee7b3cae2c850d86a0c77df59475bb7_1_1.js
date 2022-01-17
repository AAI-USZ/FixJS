function(eventArgs)

                {

                    eventArgs.cancelBubble = true;



                    InputManager.deselectAllCodeElements(documentRoot);



                    InputManager.selectNode(this);

                    //this.classList.add("selected");



                    InputManager.selectDependencies(this);

                }