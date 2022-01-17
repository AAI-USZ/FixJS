function () {
            if (xhr.responseText) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

                if (xmlDoc.getElementById("layout") != null) {

                    handleSuccess(xhr.responseText);
                    return;

                } else {
                    chrome.extension.getBackgroundPage().console.error("HabrInfo - " + "Not valid html.");
                }
            }

            handleError();
        }