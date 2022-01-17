function () {
                    console.log("Report saved successfully with id "+self.model.id);
                    
                    var doneSubmit = function() {
                        delete veos.currentReport;
                        delete veos.reportForm;
                        veos.alert("Report submitted successfully!");
                        jQuery.mobile.changePage("overview-map.html");
                    };

                    //var photos = self.$el.find('img.photo');

                    _.each(self.photos, function (photos, of) {
                    
                        if (photos.length >= 0) {
                            jQuery('.ui-loader h1').text('Uploading Photos...');
                            console.log("Found "+photos.length+" photos of "+of+" to attach...");
                            jQuery(photos).each(function (pidx) {
                                var photo = this;
                                console.log("Trying to attach Photo at "+photo.imageURL+" to Report with id "+self.model.id);
                                self.model.attachPhoto(
                                    photo,
                                    of,
                                    function () {
                                        console.log("Successfully attached Photo of "+of+" with id "+photo.id+" to Report with id "+self.model.id+".");
                                        if (pidx >= photos.length - 1) {
                                            console.log("All photos of "+of+" attached!");
                                            doneSubmit();
                                        }
                                    }
                                );
                            });
                        }
                    });

                    if (self.photos.sign.length === 0 && self.photos.camera.length === 0) {
                        doneSubmit();
                    }
                }