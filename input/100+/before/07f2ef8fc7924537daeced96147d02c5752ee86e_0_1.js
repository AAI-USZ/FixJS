function()
                {
                    FBTest.progress("profile log created");

                    var panelNode = FBTest.getPanel("console").panelNode;
                    var row = panel.panelNode.querySelector(".logRow.logRow-profile");
    
                    var caption = row.querySelector(".profileCaption");
                    FBTest.compare("Fibonacci", caption.textContent, "Verify table caption.");
    
                    var profileRows = row.getElementsByClassName("profileRow");
                    FBTest.compare(2, profileRows.length,
                        "There must be two profile rows (including header)");
    
                    FBTest.compare(9, profileRows[0].childNodes.length,
                        "There must be 9 columns");
    
                    // Verify some result data.
                    FBTest.compare("fib", profileRows[1].childNodes[0].textContent,
                        "The 'fib' function was profiled.");
                    FBTest.compare(242785, profileRows[1].childNodes[1].textContent,
                        "The 'fib' function was called exactly 242785 times.");
                    FBTest.compare("100%", profileRows[1].childNodes[2].textContent,
                        "Only the 'fib' function was executed.");
                    FBTest.compare(FW.FBL.$STRF("Line", ["profile.html", 16]),
                        profileRows[1].childNodes[8].textContent,
                        "The source link must be correct.");
    
                    FBTest.testDone("console.profile.DONE");
                }