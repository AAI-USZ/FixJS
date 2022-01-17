function(node,e) {
        return [{
            text: _('gallery.album_create')
            ,handler: this.createAlbum
            ,scope: this
        },'-',{
            text: _('gallery.album_update')
            ,handler: this.updateAlbum
            ,scope: this
        },{
            text: 'Upload'
            ,menu: {
                items: [{
                    text: _('gallery.item_upload')
                    ,handler: this.uploadItem
                    ,scope: this
                },{
                    text: _('gallery.multi_item_upload')
                    ,handler: this.uploadMultiItems
                    ,scope: this
                },{
                    text: _('gallery.batch_upload')
                    ,handler: this.batchUpload
                    ,scope: this
                },{
                    text: _('gallery.zip_upload')
                    ,handler: this.zipUpload
                    ,scope: this
                }]
            }
        },'-',{
            text: _('gallery.album_remove')
            ,handler: this.removeAlbum
            ,scope: this
        }];
    }