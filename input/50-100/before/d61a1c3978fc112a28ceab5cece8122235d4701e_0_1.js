function(){
                if (parent_div.find('#addon-categories-edit').length) {
                    initCatFields();
                }
                $(this).each(addonFormSubmit);
                initInvisibleUploads();
            }