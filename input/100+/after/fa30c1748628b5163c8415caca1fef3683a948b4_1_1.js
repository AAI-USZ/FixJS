function() {
        // Render inlines
        data_uploads_html = this.dataset.data_uploads.map(_.bind(function(upload) {
            return PANDA.templates.inline_upload_item({
                upload_type: "data",
                upload: upload.toJSON()
            });
        }, this));

        related_uploads_html = this.dataset.related_uploads.map(_.bind(function(upload) {
            return PANDA.templates.inline_upload_item({
                upload_type: "related",
                upload: upload.toJSON()
            });
        }, this));

        sample_data_html = PANDA.templates.inline_sample_data({
            "columns": _.pluck(this.dataset.get("column_schema"), "name"),
            "sample_data": this.dataset.get("sample_data")
        });

        var context = PANDA.utils.make_context({
            'dataset': this.dataset.toJSON(true),
            'categories': this.dataset.categories.toJSON(),
            'all_categories': Redd.get_categories().toJSON(), 
            'data_uploads_html': data_uploads_html,
            'related_uploads_html': related_uploads_html,
            'sample_data_html': sample_data_html
        });

        this.$el.html(PANDA.templates.dataset_view(context));
        
        this.edit_view.setElement("#modal-edit-dataset");
        this.edit_view.render();
        this.related_links_view.setElement("#modal-related-links");
        this.related_links_view.render();

        $('#modal-edit-dataset').on('shown', function () {
            $("#dataset-name").focus();
        });

        $('#modal-upload-edit').on('shown', function () {
            $("#upload-title").focus();
        });

        $('#view-dataset a[rel="tooltip"]').tooltip();

        this.related_uploader = new qq.FileUploaderBasic({
            action: "/related_upload/",
            multiple: false,
            onSubmit: this.on_related_upload_submit,
            onProgress: this.on_related_upload_progress,
            onComplete: this.on_related_upload_complete,
            showMessage: this.on_related_upload_message,
            sizeLimit: PANDA.settings.MAX_UPLOAD_SIZE,
            messages: {
                sizeError: "{file} is too large, the maximum file size is " + PANDA.settings.MAX_UPLOAD_SIZE + " bytes.",
                emptyError: "{file} is empty.",
                onLeave: "Your file is being uploaded, if you leave now the upload will be cancelled."
            }
        });

        // Create upload button
        var upload_button = CustomUploadButton.init();
        this.related_uploader._button = upload_button;
    }