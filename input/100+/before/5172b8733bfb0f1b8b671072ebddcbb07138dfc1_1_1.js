function(response) {
                    if (response.error){
                        alert(response.error);
                        return ;
                    }
                    for (r in response) {
                        n('PIC', response[r][0], response[r][1]);
                    }
                    dragsort.makeListSortable(document.getElementById("thumbnails"));
                }