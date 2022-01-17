function check_Project(proName,objfc1) {
	alert(proName);
	$.ajax({
		type: "POST",
		url: "isProjectExist?proName="+proName,
		dataType:"json",
		success : function(data){					
			var result = data["result"];
			if(result=="Failed"){
				alert("已存在同名小区，请核对！");
				objfc1.select();
				return false;
			}else {
				document.getElementById("form").submit();
				return true;						
			}
		}
	});    	
}