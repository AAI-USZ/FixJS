function(url) {
                filepicker.saveAs(url, "*/*", {"modal":true}, function(){
                    alert("File saved");
                });
            }