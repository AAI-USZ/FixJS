function(response) {
                    if (response.error){
                        alert(response.error);
                        return ;
                    }
                    var j = 1;
                    for (w in response.works) {
                        if (response.works[w][0] == response.logo) {j=parseInt(w)+1}
                        n('PIC', response.works[w][0], response.works[w][1]);
                    }
                    $('input[name="cover"]').eq(j-1).attr('checked', 'checked');
                    dragsort.makeListSortable(document.getElementById("thumbnails"));
                }