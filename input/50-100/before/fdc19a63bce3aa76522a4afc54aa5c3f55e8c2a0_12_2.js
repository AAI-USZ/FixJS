function (SelectedImage) {
        if (SelectedImage) {
            this.addChild(SelectedImage, 0, cc.SELECTED_TAG);
            SelectedImage.setAnchorPoint(cc.ccp(0, 0));
            SelectedImage.setIsVisible(false);
        }

        if (this._selectedImage) {
            this.removeChild(this._selectedImage, true);
        }

        this._selectedImage = SelectedImage;
    }