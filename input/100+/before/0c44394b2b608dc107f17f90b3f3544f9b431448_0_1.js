function (result) {

                    MetroFlickrViewer.FlickrHandler.CurrentStatus = 'none';



                    var response = JSON.parse(result.responseText);



                    if (response.stat == 'ok') {

                        if (MetroFlickrViewer.FlickrHandler.getCurrentNumberOfPhotos() >= response.photos.total) {

                            if (response.photos.total == 0) {

                                GroupedItems.FlickError('No photos to get');

                            } else {

                                GroupedItems.FlickError('Finished getting photos');

                            }

                        } else {

                            response.photos.photo.forEach(function (item) {

                                if (!MetroFlickrViewer.FlickrHandler.PhotoHash[item.id]) {

                                    MetroFlickrViewer.FlickrHandler.PhotoHash[item.id] = new MetroFlickrViewer.FlickrPhoto(item);

                                    MetroFlickrViewer.FlickrHandler.CurrentRequests.push(WinJS.xhr({ url: MetroFlickrViewer.FlickrHandler.getPhotoDetailUrl(item.id) })

                                        .then(function complete(result) {

                                            var response = JSON.parse(result.responseText);



                                            if (response.stat == 'ok') {

                                                MetroFlickrViewer.FlickrHandler.PhotoHash[response.photo.id].flickrPhoto = response.photo;

                                                MetroFlickrViewer.FlickrHandler.PhotoHash[response.photo.id].setBindingProperties();



                                                MetroFlickrViewer.FlickrHandler.CurrentRequests.push(WinJS.xhr({ url: MetroFlickrViewer.FlickrHandler.getPhotoSizesUrl(item.id) })

                                                    .then(function complete(result) {

                                                        var response = JSON.parse(result.responseText);



                                                        if (response.stat == 'ok') {

                                                            var urlParts = response.sizes.size[0].source.split('_');

                                                            urlParts = urlParts[0].split('/');

                                                            var photoId = urlParts[urlParts.length - 1];



                                                            MetroFlickrViewer.FlickrHandler.PhotoHash[photoId].setFlickrPhotoSizes(response.sizes);

                                                            MetroFlickrViewer.FlickrHandler.PhotoHash[photoId].setSizeBindingProperties();



                                                            if (MetroFlickrViewer.FlickrHandler.PhotoReadyCallback) {

                                                                MetroFlickrViewer.FlickrHandler.PhotoReadyCallback(MetroFlickrViewer.FlickrHandler.PhotoHash[photoId]);

                                                            }

                                                        } else {

                                                            if (MetroFlickrViewer.FlickrHandler.ErrorCallback) {

                                                                MetroFlickrViewer.FlickrHandler.ErrorCallback(response.message);

                                                            }

                                                        }

                                                    }));



                                                if (MetroFlickrViewer.FlickrHandler.PhotoHash[response.photo.id]) {

                                                    MetroFlickrViewer.FlickrHandler.PhotoHash[response.photo.id].setFlickrInfo(response.photo);

                                                }



                                                //if (MetroFlickrViewer.FlickrHandler.PhotoReadyCallback) {

                                                //    MetroFlickrViewer.FlickrHandler.PhotoReadyCallback(MetroFlickrViewer.FlickrHandler.PhotoHash[response.photo.id]);

                                                //}

                                            } else {

                                                if (MetroFlickrViewer.FlickrHandler.ErrorCallback) {

                                                    MetroFlickrViewer.FlickrHandler.ErrorCallback(response.message);

                                                }

                                            }

                                        },

                                        function (xmlHttpRequest) {

                                            // fail

                                        },

                                        function (xmlHttpRequest) {

                                            // progress

                                        }));

                                }

                            });



                            MetroFlickrViewer.FlickrHandler.CurrentPage++;



                            if (MetroFlickrViewer.FlickrHandler.CurrentPage < 5) {

                                setInterval(MetroFlickrViewer.FlickrHandler.getPhotos(), 1000);

                            }

                        }

                    } else {

                        if (MetroFlickrViewer.FlickrHandler.ErrorCallback) {

                            MetroFlickrViewer.FlickrHandler.ErrorCallback(response.message);

                        }

                    }

                }