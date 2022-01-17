function(node)
            {
                // Execute an expression on the Command Line
                FBTest.selectPanel("console");
                var expr = "$0.appendChild(document.createTextNode(' tnode')); $0.normalize();";
                FBTest.executeCommand(expr);

                // Switch back to the HTML panel
                FBTest.selectPanel("html");

                // Wait till the executed expression causes HTML panel update.
                FBTest.waitForHtmlMutation(null, "span", function(node)
                {
                    // Verify HTML panel content after mutation.
                    var expected = /a &aring;&auml;&ouml; b/;
                    FBTest.compare(expected, node.textContent, "The text content must match");

                    FBTest.testDone("issue5448.DONE");
                });
            }