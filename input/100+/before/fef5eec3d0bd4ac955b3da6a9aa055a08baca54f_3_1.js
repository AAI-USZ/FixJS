function FormCheck(){
	objfc1=document.getElementById("project.proName");
	objfc2=document.getElementById("project.proAddress");
	objfc3=document.getElementById("project.deliveryTime");
	objfc4=document.getElementById("project.proType");
	objfc5=document.getElementById("proDistrict");
	objfc6=document.getElementById("project.proStreet");
	
	if(strim(objfc1.value)==""){
		alert("小区名称不能为空");
		objfc1.focus();
		return (false);
	}
	if(strim(objfc4.value)==""){
		alert("请选择项目类型");
		objfc4.focus();
		return (false);
	}
	if(strim(objfc5.value)==""){
		alert("请选择所属地区");
		objfc5.focus();
		return (false);
	}
	if(strim(objfc6.value)==""){
		alert("请选择所属街道");
		objfc6.focus();
		return (false);
	}
	if(strim(objfc2.value)==""){
		alert("小区地址不能为空");
		objfc2.focus();
		return (false);
	}
	
	document.getElementById("form").submit();
	return true;	
}