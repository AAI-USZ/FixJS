function () {
                    console.log("Acquired photo of '"+of+'".')

                    veos.reportForm.photos[of].push(photo);
                    photo.upload();
                    veos.reportForm.renderPhotos();
                }