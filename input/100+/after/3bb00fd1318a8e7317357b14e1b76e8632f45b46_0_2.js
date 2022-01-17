function(seq_index){
		//Update both indexes
		DocManager.seq_index = seq_index;
        DocManager.doc_index = DocManager.seq_list[seq_index];

        //Show the document
        $("#doc-box").html(DocManager.doc_list[DocManager.doc_index].content);

        //Update navigation
        $("#doc-index").val(DocManager.doc_index+1);
        $("#docs-remaining").html(DocManager.seq_list.length-DocManager.seq_index);

	    if( DocManager.seq_index == 0 ){ $("#prev-doc-button").addClass("disabled"); }
	    else{ $("#prev-doc-button").removeClass("disabled"); }

	    if( DocManager.seq_index == DocManager.doc_list.length-1 ){ $("#next-doc-button").addClass("disabled"); }
	    else{ $("#next-doc-button").removeClass("disabled"); }

        //Update hidden field
        $("#doc-index-hidden").val(DocManager.doc_index);

        //Update codebook markup
        //codebookModel.markupCodebook();

        //Update metadata
        var M = DocManager.doc_list[DocManager.doc_index].metadata;
        var elements = 1;
        $("#doc-metadata").html("");
        for( m in M ){
            $("#doc-metadata").append("<dt>"+m+"</dt>");
            $("#doc-metadata").append("<dd>"+M[m]+"</dd>");

            $("#edit-metadata").append("<div id = \"" + elements + "\" class=\"control-group\"><input type=\"text\" class=\"input-xlarge\" name=\"key\" placeholder='e.g. \"New York Times op-eds\"' value=\""+m+ "\"><div class=\"controls\"><textarea rows=\"3\" class=\"input-xlarge\" name=\"value\" placeholder='e.g. \"New York Times op-eds\"'>"+M[m]+"</textarea><button id=\"delete-"+elements+"\"class=\"btn btn-mini delete\">&times;</button></div></div>");
            elements++;
        }
        console.log(M)
        if (!M) {
            console.log("empty");
            $("#edit-metadata").append("<div id = \"" + elements + "\" class=\"control-group\"><input type=\"text\" class=\"input-xlarge\" name=\"key\" placeholder='e.g. \"New York Times op-eds\"' value=\""+m+ "\"><div class=\"controls\"><textarea rows=\"3\" class=\"input-xlarge\" name=\"value\" placeholder='e.g. \"New York Times op-eds\"'>"+M[m]+"</textarea><button id=\"delete-"+elements+"\"class=\"btn btn-mini delete\">&times;</button></div></div>");
        }


        $(name[value="meta-data-elements"]).val(elements);
         $(".delete").live('click',function () {
        //live is deprecated, using it for sake of expediancy, click doesn't work
               // $(this).parent().parent().remove();
                $(this).closest(".control-group").remove();
                elements--;
            });

         $("#add").on('click',function () {
                $("#edit-metadata").append("<div id = \"" + elements + "\" class=\"control-group\"><input type=\"text\" name =\"key\"class=\"input-xlarge\"  placeholder='e.g. \"New York Times op-eds\"'><div class=\"controls\"><textarea rows=\"3\" class=\"input-xlarge\"  name=\"value\" placeholder='e.g. \"New York Times op-eds\"'></textarea><button id=\"delete-"+elements+"\"class=\"btn btn-mini delete\">&times;</button></div></div>");
                elements++;
                //this is likely unnecessary now, as well as the the entire idea of tracking the number of elements
                $(name[value="meta-data-elements"]).val(elements);
            });
    }