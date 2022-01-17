function Foreground() {

    //Initialize foreground UI and maintain a handle to be able to update UI.

    var uiElements = UiElements();



    var listen = function () {

        //Background's player object will notify the foreground whenever its state changes.

        chrome.extension.onConnect.addListener(function (port) {

            port.onMessage.addListener(function (message) {



                //Background communicates error messages to the foreground to be displayed to the UI.

                if (message.errorMessage)

                    alert(message.errorMessage);



                uiElements.updateWithMessage(message);

            });

        });

    } (); //Start listening for YT player events.

}