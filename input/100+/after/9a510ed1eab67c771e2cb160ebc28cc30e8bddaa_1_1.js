function(){
	$('#form1').attr("action","addPublicRepair?fbiId="+$('#FBIID').val());
	$.ajax({
	    type: "POST",
		url: "select_equip?fbiId="+$('#FBIID').val(),
		dataType: "json",
		success : function(data){
			var selector=$("#equipNum"); 
		    $.each(data.Rows,function(commentIndex, comment) {
		    	alert(comment['equipNum']);
			    selector.append('<option value="'+comment['equipNum']+'">'+comment['equipNum']+'</option>');
		    });
		},
	});
}