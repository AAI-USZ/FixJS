function (confirmation, parentBundle, requestReport, recordEditor) {
        if (recordEditor && recordEditor.unsavedChanges) {
            openConfirmation(confirmation, "saveDialog", {
                messages: [ "reporting-dialog-primaryMessageSave" ],
                messagekeys: {
                    actText: "reporting-dialog-actTextSave",
                    actAlt: "reporting-dialog-actAltSave",
                    proceedText: "reporting-dialog-proceedTextSave",
                    proceedAlt: "reporting-dialog-proceedAltSave"
                }
            }, 
            parentBundle,
            function (userAction) {
                if (userAction === "act") {
                    recordEditor.events.afterSave.addListener(function () {
                        requestReport(false);
                    }, undefined, undefined, "last");
                    recordEditor.events.onSave.fire();
                } else if (userAction === "proceed") {
                    requestReport(false);
                }
            });
        }
        else {
            openConfirmation(confirmation, "deleteDialog", {
                messages: [ "reporting-dialog-primaryMessage" ],
                messagekeys: {
                    actText: "reporting-dialog-actText",
                    actAlt: "reporting-dialog-actAlt"
                }
            }, 
            parentBundle,
            function (userAction) {
                if (userAction === "act") {
                    requestReport(false);
                }
            });
        }
    }