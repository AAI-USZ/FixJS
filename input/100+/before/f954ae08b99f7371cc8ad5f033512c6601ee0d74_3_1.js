function(event) {
                
                if (debug) console.log('dropped something in the #files area')
                
                event.stopPropagation();
                event.preventDefault();
                //                console.log(event);
                fileList = event.originalEvent.dataTransfer.files;
                console.log(fileList);
                var filesToUpload = [];
                var tooLargeFiles = [];

                $(fileList).each(function(i, file) {
                    if (file.size <= sizeLimit) {
                        filesToUpload.push(file);
                    } else {
                        tooLargeFiles.push(file);
                    }
                });

                if (filesToUpload.length < fileList.length) {

                    var errorText = 'The following files are too large (limit ' + sizeLimit/(1024*1024) + ' Mbytes):<br>\n';

                    $(tooLargeFiles).each(function(i, tooLargeFile) {
                        errorText += tooLargeFile.name + ': ' + Math.round(tooLargeFile.size/(1024*1024)) + ' Mbytes<br>\n';
                    });

                    Structr.error(errorText, function() {
                        $.unblockUI({
                            fadeOut: 25
                        });
                        $(filesToUpload).each(function(i, file) {
                            if (debug) console.log(file);
                            if (file) _Files.createFile(file);
                        });
                    })
                } else {
                    $(fileList).each(function(i, file) {
                        if (debug) console.log(file);
                        if (file) _Files.createFile(file);
                    });

                }

                return false;
            }