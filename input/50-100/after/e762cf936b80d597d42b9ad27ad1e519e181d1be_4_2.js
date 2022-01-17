function () {
                    if (!connection.frame) {
                        return;
                    }

                    var frame = connection.frame,
                        src = transportLogic.getUrl(connection, that.name, true) + "&frameId=" + connection.frameId;
                    connection.log("Upating iframe src to '" + src + "'.");
                    frame.src = src;
                }