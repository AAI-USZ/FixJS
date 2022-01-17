function() {
            if (params.files.avatar && params.files.avatar.size) {
                image = ImageManip(params.files.avatar.path);
                image.size(this.next);
            } else {
                this.last();
            }
        }