function () {
        if (!report.photos)
          report.photos = [];

        report.photos.push(photo);
        photo.report = report; // in case we need to later refer to the report we're attached to from the photo

        report.updatePhotosAttribute();

        photo.on('change sync', report.updatePhotosAttribute, report);
        
        console.log("Photo "+photo.id+" attached to report "+ report.id);

        if (successCallback)
          successCallback(report, photo);
      }