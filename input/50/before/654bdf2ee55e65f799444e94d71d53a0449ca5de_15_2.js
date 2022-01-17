function () {
            log('editAvatarView:render');
            this._initMediaUploader();
            $('#avatar-viewer').append('<img src="' + this.model.get('Avatar').Files.medium.RelativeUri + '" />');
            return this;
        }