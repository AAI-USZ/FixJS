function () {
            var report = this.model;

            if (this.loader)
                this.hideLoader();

            this.createPointDetailsMap(report);
            
            var photoThumbnail = jQuery('<img class="photo-thumbnail" />');
            var photoContainer = this.$el.find('.photo-thumbnail-container');

            var ownerName;
            if (report.get('owner_name')) {
                ownerName = "<span class='owner_name'>" + report.get('owner_name') + "</span>";
            } else {
                ownerName = "<span class='owner_name unknown'>Unknown Owner</span>";
            }

            this.$el.find('.installation-title').html(ownerName);

            // TODO: replace with Matt's stuff
            /*    var photoThumbnail = jQuery('<img class="photo-thumbnail" />');
            photoThumbnail.attr('src', I'M GOING TO BE A PHOTO);
            var photoContainer = jQuery('#point-details-page .photo-thumbnail-container');
            photoContainer.append(photoThumbnail); */ 

            if (report.get('camera')) {
                if (report.get('camera').hasOwnProperty("photos") && report.get('camera').photos.length > 0 && report.get('camera').photos[0].big_url !== null) {
                    photoThumbnail.attr('src', veos.model.baseURL + report.get('camera').photos[0].big_url);
                }
                this.$el.find('.point-type').text('Camera');
                this.$el.find('.point-title-1').text('Camera\'s location: ');
                this.$el.find('.point-content-1').text(report.attributes.loc_description_from_google);
                this.$el.find('.point-title-2').text('Owner name: ');
                this.$el.find('.point-content-2').html(ownerName);
                this.$el.find('.point-title-3').text('Owner description: ');
                this.$el.find('.point-content-3').text(report.attributes.owner_type);
            } else if (report.get('sign')) {
                if (report.get('sign').hasOwnProperty("photos") && report.get('sign').photos.length > 0 && report.get('sign').photos[0].big_url !== null) {
                    photoThumbnail.attr('src', veos.model.baseURL + report.get('sign').photos[0].big_url);
                }
                this.$el.find('.point-type').text('Sign');
                this.$el.find('.point-title-1').text('Sign location: ');
                this.$el.find('.point-content-1').text(report.attributes.loc_description_from_google);
                this.$el.find('.point-title-2').text('Owner name: ');
                this.$el.find('.point-content-2').html(ownerName);
                this.$el.find('.point-title-3').text('Owner description: ');
                this.$el.find('.point-content-3').text(report.attributes.owner_type);
                this.$el.find('.point-title-4').text('Visibility of sign: ');
                this.$el.find('.point-content-4').text(report.get('sign').visibility);
                this.$el.find('.point-title-5').text('Text of Sign: ');
                this.$el.find('.point-content-5').text(report.get('sign').text);
                /*jQuery('#point-details-page .point-title-1').text('Visibility: ');
                jQuery('#point-details-page .point-content-1').text('Obscure/High');
                jQuery('#point-details-page .point-title-2').text('Stated Purpose: ');
                jQuery('#point-details-page .point-content-2').text('Public Safety');*/
                this.$el.find('.point-content-4').append(jQuery('<br />'));
            } else {
                console.log ('neither a camera or a sign');
            }
            photoContainer.append(photoThumbnail);
        }