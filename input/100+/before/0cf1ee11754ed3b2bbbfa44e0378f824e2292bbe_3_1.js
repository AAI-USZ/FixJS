function()

    {

        try

        {

            if(this.haveDependenciesBeenDetermined) { return; }



            var Firecrow = FBL.Firecrow;

            var Browser = Firecrow.DoppelBrowser.Browser;

            FBL.Firecrow.ASTHelper.setParentsChildRelationships(this.pageModel);



            var dependencyGraph = new Firecrow.DependencyGraph.DependencyGraph();

            var browser = new Browser();



            browser.registerNodeCreatedCallback(dependencyGraph.handleNodeCreated, dependencyGraph);

            browser.registerNodeInsertedCallback(dependencyGraph.handleNodeInserted, dependencyGraph);

            browser.registerDataDependencyEstablishedCallback(dependencyGraph.handleDataDependencyEstablished, dependencyGraph);

            browser.registerControlDependencyEstablishedCallback(dependencyGraph.handleControlDependencyEstablished, dependencyGraph);

            browser.registerControlFlowConnectionCallback(dependencyGraph.handleControlFlowConnection, dependencyGraph);

            browser.registerImportantConstructReachedCallback(dependencyGraph.handleImportantConstructReached, dependencyGraph);



            browser.buildPageFromModel(this.pageModel);

            this.establishDependencies(dependencyGraph);

        }

        catch(e) { alert("HtmlRepresentation - error when determining dependencies: " + e); }

    }