function (connection) {
                var cw = null;
                if (connection.frame) {
                    if (connection.frame.stop) {
                        connection.frame.stop();
                    } else {
                        cw = connection.frame.contentWindow || connection.frame.contentDocument;
                        if (cw.document && cw.document.execCommand) {
                           cw.document.execCommand("Stop");
                        }
                    }
                    $(connection.frame).remove();
                    delete transportLogic.foreverFrame.connections[connection.frameId];
                    connection.frame = null;
                    connection.frameId = null;
                    delete connection.frame;
                    delete connection.frameId;
                    connection.log("Stopping forever frame");
                }
            }