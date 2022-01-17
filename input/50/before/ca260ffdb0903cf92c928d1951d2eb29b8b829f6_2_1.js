function() {
            console.log("success");

            App.BlogEntryFrontend.changeEvent.fire();
            App.stack.pop();
        }