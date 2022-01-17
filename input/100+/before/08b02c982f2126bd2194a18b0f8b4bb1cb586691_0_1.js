function(htmlModel)

                {

                    try

                    {

                        var Firecrow = FBL.Firecrow;

                        var Browser = Firecrow.DoppelBrowser.Browser;

                        var model = htmlModel;

                        ASTHelper.setParentsChildRelationships(htmlModel);

                        FBL.pageModel = model;



                        var currentPageLocation = fbHelper.getCurrentPageDocument().location.href;

                        var dependencyGraph = new Firecrow.DependencyGraph.DependencyGraph();

                        var browser = new Browser();



                        var suggestedInput = "";

                        var window = fbHelper.getWindow();



                        for(var propName in window)

                        {

                            if(propName.length > 1 && propName.length <= 3 && propName[0] == "a")

                            {

                                if(suggestedInput != "") { suggestedInput += ","; }



                                suggestedInput += propName + ":" + window[propName];

                            }

                        }



                        var input = prompt("Enter identifiers to be sliced (comma separated, only simple : a1:3,a2:'4'...)", suggestedInput);

                        var slicingVars = input.trim().split(",").map(function(item)

                        {

                            var parts = item.trim().split(":");

                            return { name: parts[0], value: parts[1]};

                        });

                        browser.registerSlicingCriteria(slicingVars.map(function(slicingVar)

                        {

                            return Firecrow.DependencyGraph.SlicingCriterion.createReadIdentifierCriterion(currentPageLocation, -1, slicingVar.name);

                        }));



                        browser.registerNodeCreatedCallback(dependencyGraph.handleNodeCreated, dependencyGraph);

                        browser.registerNodeInsertedCallback(dependencyGraph.handleNodeInserted, dependencyGraph);

                        browser.registerDataDependencyEstablishedCallback(dependencyGraph.handleDataDependencyEstablished, dependencyGraph);

                        browser.registerControlDependencyEstablishedCallback(dependencyGraph.handleControlDependencyEstablished, dependencyGraph);

                        browser.registerControlFlowConnectionCallback(dependencyGraph.handleControlFlowConnection, dependencyGraph);

                        browser.registerImportantConstructReachedCallback(dependencyGraph.handleImportantConstructReached, dependencyGraph);



                        browser.buildPageFromModel(model, function()

                        {

                            dependencyGraph.markGraph(model.htmlElement);

                            var errors = "";



                            slicingVars.forEach(function(slicingVar)

                            {

                                var propertyValue = browser.globalObject.getPropertyValue(slicingVar.name);

                                var val = propertyValue.value;

                                if(val === null) { val = "null";}



                                if(val.toString() != slicingVar.value.toString())

                                {

                                    errors += "The value of " + slicingVar.name + " differs - is " + propertyValue.value + " and should be " + slicingVar.value + ";;";

                                }

                            }, this);



                            var pageName  = currentPageLocation.substring(currentPageLocation.lastIndexOf("/") + 1, currentPageLocation.length)



                            if(errors == "")

                            {

                                prompt("Success", currentPageLocation + " - OK");



                                Firecrow.FileHelper.writeToFile

                                (

                                    currentPageLocation.replace(pageName, "index-sliced-results.txt").replace("file:///",""),

                                    JSON.stringify(slicingVars)

                                );

                            }

                            else { prompt ("Error", currentPageLocation + " - ERROR:" + errors); }



                            Firecrow.FileHelper.writeToFile

                            (

                                currentPageLocation.replace(pageName, "index-sliced-sliced.html").replace("file:///",""),

                                Firecrow.CodeTextGenerator.generateSlicedCode(model)

                            );

                        });

                    }

                    catch(e) { alert("Error when processing html model in slicing: " + e); }

                }