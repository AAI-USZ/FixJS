function() {
            itemsToUpload = [];
            itemsUploaded = 0;
            disableAddToQueue();
            renderQueue();
            $('#newaddcontent_container input, #newaddcontent_container textarea').val('');
            tmpBrowsedFile = {};
            filesList = [];
            contentDataBatch = [];
        }