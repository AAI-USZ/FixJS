function(row)
        {
            // Verify displayed text.
            var reTextContent = /ReferenceError\:\s*undefinedVariable is not defined\s*var test = undefinedVariable;\s*issue5525.html\s*\(line 10\)/;
            FBTest.compare(reTextContent, row.textContent, "Text content must match.");

            // Create error breakpoint
            var br = row.getElementsByClassName("errorBreak")[0];
            FBTest.click(br);

            // Switch to the Script and Breakpoints panels.
            FBTest.selectPanel("script");
            var panel = FBTest.selectSidePanel("breakpoints");

            // Check content of the Breakpoints panel
            var panelNode = panel.panelNode;
            var rows = panelNode.getElementsByClassName("breakpointRow");
            FBTest.compare(rows.length, 1, "There must be one breakpoint");

            // Finish test
            FBTest.testDone("console.error.DONE");
        }