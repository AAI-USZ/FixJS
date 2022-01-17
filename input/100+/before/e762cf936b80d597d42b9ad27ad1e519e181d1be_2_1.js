function (connection) {
                if (connection.frame) {
                    if (connection.frame.stop) {
                        connection.frame.stop();
                    } else if (connection.frame.document && connection.frame.document.execCommand) {
                        connection.frame.document.execCommand("Stop");
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