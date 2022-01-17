function(contentToAdd, disableRender) {
            itemsToUpload.push(contentToAdd);
            disableAddToQueue();
            enableStartUpload();
            if (!disableRender) {
                renderQueue();
            }
        }