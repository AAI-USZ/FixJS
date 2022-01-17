function(data, append) {
        if (this.isRequesting) {
            return;
        }
        append = (typeof(append) === 'undefined') ? false : append;
        this.requestData = data || this.requestData;
        if (append) {
            this.requestData.more = true;
        }
        this.requestData.models = [];
        if (Frog.Prefs.include_image) {
            this.requestData.models.push('image');
        }
        if (Frog.Prefs.include_video) {
            this.requestData.models.push('video');
        }
        this.requestData.models = this.requestData.models.unique().join(',');
        
        var self = this;
        new Request.JSON({
            url: '/frog/gallery/' + this.id + '/filter',
            noCache: true,
            onRequest: function() {
                self.isRequesting = true;
                self.spinner.show();
            },
            onSuccess: function(res) {
                self.requestValue = res.value;
                if (res.isSuccess) {
                    if (!append) {
                        self.clear();
                        if (res.values.length === 0) {
                            self.container.set('text', 'Nothing Found')
                        }
                    }
                    res.values.each(function(o) {
                        self.objects.push(o);
                        var t = new Frog.Thumbnail(self.objects.length - 1, o, {
                            artist: o.author.first + ' ' + o.author.last,
                            imageID: o.id
                        });
                        self.thumbnails.push(t);
                        t.setSize(self.tileSize);
                        self.container.grab($(t));
                    });
                    self._getScreen();
                }
                self.isRequesting = false;
                self.spinner.hide();
            }
        }).GET(this.requestData);
    }