function (event) {
                if (event.originalEvent.dataTransfer.files) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.originalEvent.dataTransfer.dropEffect = "none";
                }
            }