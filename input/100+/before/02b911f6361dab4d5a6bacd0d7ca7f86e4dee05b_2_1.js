function(row)
            {
                var panelNode = FBTest.getPanel("console").panelNode;
                var node = panelNode.querySelectorAll(".objectBox-errorMessage.hasTwisty.hasBreakSwitch");
                FBTest.ok(node, "The error message must have a break switch");

                // Verify displayed text.
                var reTextContent = /\s*ReferenceError\:\s*foops is not defined\s*/;
                FBTest.compare(reTextContent, row.textContent, "Text content must match.");

                // Show stack trace.
                var objectBox = row.getElementsByClassName("errorTitle")[0];
                FBTest.click(objectBox);

                // Verify stack frames
                var frames = panelNode.getElementsByClassName("objectBox-stackFrame");
                if (FBTest.compare(1, frames.length, "There must be one frame"))
                {
                    FBTest.compare(/onclick/, frames[0].textContent,
                        "The function name must be correct " + frames[0].textContent);
                }

                var sourceBox = row.querySelector(".errorSourceBox.errorSource-show");
                if (FBTest.ok(node, "Source line must be there"))
                {
                    var expected = /\s*foops\(\)\s*\;onclick\s*\(line\s*2\)\s*/;
                    FBTest.compare(expected, sourceBox.textContent, "The source must match");
                }

                FBTest.testDone("issue5544.DONE");
            }