function(contentToAdd, disableRender, append) {
            if ($.isArray(contentToAdd)) {
                itemsToUpload = itemsToUpload.concat(contentToAdd);
            } else {
                itemsToUpload.push(contentToAdd);
            }

            disableAddToQueue();
            enableStartUpload();
            if (!disableRender) {
                renderQueue(append, contentToAdd);
            }
        }