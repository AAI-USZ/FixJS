function(buttonId) {
                buttonId = buttonId || null;
                if (buttonId === "yes" || force) {
                    me.fireEvent('playerpicked', record);
                    me.setStatusMessage('Sending pick to server...');
                    me.getDataView().setDisabled(true);
                }
            }