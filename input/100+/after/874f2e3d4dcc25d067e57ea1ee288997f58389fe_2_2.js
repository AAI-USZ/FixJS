function ownerExport(){
	var qtype = '';
	var query = '';
	var qtype1=$('#qtype1').val();
	var qtype2=$('#qtype2').val();
	var query1=$('#query1').val();
	var query2=$('#query2').val();
	query += (query1=="")?"null":query1+",";
	query += (query2=="")?"null":query2;
	qtype += qtype1+","+qtype2;
	
	$.ajax({
		type: 'POST',
		url: "exportOwnerList",
		data: [{name:'qtype',value:qtype},{name:'query',value:query}],
		success: function(){
			alert("导出成功");
		}
	});
}