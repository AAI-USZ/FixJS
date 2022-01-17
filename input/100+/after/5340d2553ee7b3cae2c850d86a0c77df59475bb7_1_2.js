function(documentRoot)

    {

        try

        {

            var nodes = documentRoot.querySelectorAll(".node");



            for (var i = 0; i < nodes.length; i++)

            {

                nodes[i].onclick = function(eventArgs)

                {

                    eventArgs.cancelBubble = true;



                    InputManager.deselectAllCodeElements(documentRoot);



                    InputManager.selectNode(this);

                    //this.classList.add("selected");



                    InputManager.selectDependencies(this);

                }

            }

        }

        catch (e) { alert("Error while initializing input: " + e); }

    }