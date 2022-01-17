function () {

        try {

            if (this.haveDependenciesBeenDetermined) {

                return;

            }



            var Firecrow = FBL.Firecrow;

            var Browser = Firecrow.DoppelBrowser.Browser;

            FBL.Firecrow.ASTHelper.setParentsChildRelationships(this.pageModel);



            this.dependencyGraph = new Firecrow.DependencyGraph.DependencyGraph();

            var browser = new Browser();



            browser.registerNodeCreatedCallback(this.dependencyGraph.handleNodeCreated, this.dependencyGraph);

            browser.registerNodeInsertedCallback(this.dependencyGraph.handleNodeInserted, this.dependencyGraph);

            browser.registerDataDependencyEstablishedCallback(this.dependencyGraph.handleDataDependencyEstablished, this.dependencyGraph);

            browser.registerControlDependencyEstablishedCallback(this.dependencyGraph.handleControlDependencyEstablished, this.dependencyGraph);

            browser.registerControlFlowConnectionCallback(this.dependencyGraph.handleControlFlowConnection, this.dependencyGraph);

            browser.registerImportantConstructReachedCallback(this.dependencyGraph.handleImportantConstructReached, this.dependencyGraph);



            browser.buildPageFromModel(this.pageModel);

        }

        catch (e) {

            alert("HtmlRepresentation - error when determining dependencies: " + e);

        }

    }