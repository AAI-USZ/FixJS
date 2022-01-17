function (f) {
                // If a JSON file has been loaded, pass the JSON data set to ADORE,
                // draw the contents of the file and update the label indicating the file name.
                if (sourceControl == "jsonFile") {
                    adore.setJsonData(f.target.result);
                    adore.drawFromJson();
                    $("#jsonFileName").text(fileName);
                }

                // If a CSS skin file has been loaded, build a `<style>` tag that holds the
                // contents of the CSS file and append it to the `<head>` tag of the document.
                if (sourceControl == "skinFile") {
                    var styleNode = $("<style />")
                        .attr("type", "text/css")
                        .attr("id", "domain-specific-style")
                        .text(f.target.result);
                    $("head").append(styleNode);

                    // A repaint is needed because the appliance of the CSS file may have changed
                    // the size and position of the nodes.
                    adore.repaint();

                    // We also update the label indicating the CSS file name.
                    $("#skinFileName").text(fileName);
                }
            }