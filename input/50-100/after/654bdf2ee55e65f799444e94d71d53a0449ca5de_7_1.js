function (e, data) {
            log('editAvatarView:_onUploadDone');
            this.model.set('AvatarId', data.result.Id);
            var mediaResource = new MediaResource(data.result);
            //this.$el.find('#avatar-viewer img').replaceWith($('<img src="' + mediaResource.get('ProfileImageUri') + '" alt="" />'));
            $('#avatar-viewer').empty().append('<img src="' + mediaResource.get('Files').ThumbnailMedium.RelativeUri + '" width="200px;" />');
        }