function(eventArgs)

                {

                    eventArgs.cancelBubble = true;



                    InputManager.deselectAllCodeElements(documentRoot);



                    var deps = "";



                    for (var x = 0; x < this.model.dependencies.length; x++)

                    {

                        deps += this.model.dependencies[x].nodeId + " ";

                    }



                    alert("clicked: " + this.id + " " + this.className);



                    this.classList.add("selected");



                    var dependencies = this.model.dependencies;



                    if (dependencies == null) { return; }



                    for (var j = 0; j < dependencies.length; j++)

                    {

                        var currentItem = dependencies[j];

                        var allDependencies = {};

                        InputManager.getAllDependencies(currentItem, allDependencies);



                        for (var nodeId in allDependencies)

                        {

                            var dependency = allDependencies[nodeId];

                            if (dependency.htmlNode != null)

                            {

                                dependency.htmlNode.classList.add("secondHandDependency");

                            }

                            else {

                                // maybe it's dependent upon a variable/element from another source file

                                // therefore it can be normal if it isn't found

                            }

                        }



                        if (currentItem.htmlNode != null)

                        {

                            currentItem.htmlNode.classList.add("dependent");

                        }

                        else

                        {

                            // direct dependency could also be in another source files

                            // check former comment

                        }

                    }

                }