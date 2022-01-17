function() {
        if (fimo.device.isRunning()) {
          return page.create(views.newObject({
            url: "" + hostname + "/objects/create",
            imageUrl: "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg",
            imageId: "4fff0a2e0df2a02233000007"
          }));
        } else {
          return fimo.device.ready(function() {
            var destinationType, pictureSource;
            pictureSource = Camera.PictureSourceType['PHOTOLIBRARY'];
            destinationType = Camera.DestinationType.FILE_URI;
            return navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataFail, {
              quality: 50,
              allowEdit: true,
              destinationType: destinationType,
              sourceType: pictureSource
            });
          });
        }
      }