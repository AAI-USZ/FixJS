function(data){
                DocManager.doc_list = data.documents;
                if(seq_list){
                    DocManager.seq_list = seq_list;
                }else{
                    //If seq_list isn't specified, create an array of indexes in boring counting order
                    DocManager.seq_list = new Array(DocManager.doc_list.length);
                    for( var i=0; i<DocManager.doc_list.length; i++ ){
                        DocManager.seq_list[i] = i;
                    }
                }

                DocManager.showDocument(0);
                console.log(DocManager.seq_list.length);
                $("#doc-count").html(DocManager.seq_list.length);
            }