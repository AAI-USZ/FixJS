function() {
            itemsToUpload = [];
            existingAdded = [];
            itemsUploaded = 0;
            disableAddToQueue();
            renderQueue();
            $('#newaddcontent_container input, #newaddcontent_container textarea').val('');
            $('.MultiFile-remove').click();
        }