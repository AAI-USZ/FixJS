function () {
    "use strict";
    // This is the ADORE configuration object that binds the ADORE backend functionality
    // to the presentation.
    var config = {
        // The area where ADORE should draw its graphs.
        drawingArea: $("#drawingArea"),
    };

    // We handle the file upload of the JSON data set and the CSS skin file
    // in the same function.
    function handleFileUpload(evt) {
        var fileObject = evt.target.files[0],
            fileName = evt.target.value,
            // The user control that fired the event.
            sourceControl = evt.target.id;

        if (fileObject) {
            var reader = new FileReader();

            reader.onload = function (f) {
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
            };

            reader.readAsText(fileObject);
        } else {
            console.error("adore: failed to load from file" + evt.target.value);
        }
    }

    adore.setConfig(config);

    var pathIDSpan = $("#pathIDSpan");

    // We setup a button that enables the user to switch to the previous path.
    $("#previousPathButton").click(function () {
        $(this).get(0).disabled = true;
        adore.switchToPreviousPath();
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
        $(this).get(0).disabled = false;
    });

    // The same to navigate to the next path.
    $("#nextPathButton").click(function () {
        $("#nextPathButton").prop("disabled", true)
        adore.switchToNextPath();
        pathIDSpan.text((adore.getActivePathIndex() + 1).toString() + " of " + adore.getPathCount());
        $("#nextPathButton").prop("disabled", false);
    });

    // We set up a new pair of buttons to invoke the file select dialog
    // boxes. The original, ugly buttons have been hidden via CSS.
    var skinFileInput = $("#skinFile"),
        jsonFileInput = $("#jsonFile");

    // The ugly, hidden buttons are bound to their corresponding functions.
    skinFileInput.get(0).onchange = handleFileUpload;
    jsonFileInput.get(0).onchange = handleFileUpload;

    // The new, cool buttons fire the click event of the hidden buttons, if they themselves
    // are clicked.
    $("#skinFileBrowseButton").get(0).onclick = function () { skinFileInput.click(); };
    $("#jsonFileBrowseButton").get(0).onclick = function () { jsonFileInput.click(); };
}