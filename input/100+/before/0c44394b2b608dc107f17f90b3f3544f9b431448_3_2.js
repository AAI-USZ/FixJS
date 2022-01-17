function (eventInfo) {

                    eventInfo.setPromise(MetroFlickrViewer.FlickrUser.saveData());



                    // save the current config

                    var previousData = {

                        lastUser: MetroFlickrViewer.FlickrUser.userName

                    }



                    app.local.writeText(configFileName, JSON.stringify(previousData));

                }