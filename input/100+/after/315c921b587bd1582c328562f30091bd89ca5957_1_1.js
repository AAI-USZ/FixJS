function(json) {
                    var uploadurl = json && json.listing && json.listing.upload_url || null,
                        val = json && json.listing && json.listing[fieldname] ? json.listing[fieldname] : null;
                    if (uploadurl) {
                        self.base.listing.upload_url = uploadurl;
                        self.setUploadUrls();
                    }
                    if (val) {
                        self.base.listing[fieldname] = val;
                        self.displayUpload(uploadId);
                        self.base.displayCalculated();
                        pl('#' + fieldurl).attr({value: ''});
                        pl('#' + id + 'msg').removeClass('errorcolor').removeClass('inprogress').addClass('successful').text('Document uploaded');
                    }
                }