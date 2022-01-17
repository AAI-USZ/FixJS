function(){
	$('#form1').attr("action","addPublicRepair?fbiId="+$('#FBIID').val());
	document.getElementsByName("fbiId").value = $('#FBIID').val();
}