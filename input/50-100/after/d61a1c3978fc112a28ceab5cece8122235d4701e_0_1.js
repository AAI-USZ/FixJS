function(){
                if (parent_div.find('#addon-categories-edit').length) {
                    initCatFields();
                }
                if (parent_div.find('#manifest-url').length) {
                  addManifestRefresh();
                }
                $(this).each(addonFormSubmit);
                initInvisibleUploads();
            }