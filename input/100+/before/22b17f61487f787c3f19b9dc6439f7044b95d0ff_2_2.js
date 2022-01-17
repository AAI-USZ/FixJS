function appendRowElev(){
	objtb=document.getElementById("elevatorList");
	objNum=document.getElementById("builNum");
	objLast=document.getElementById("elevatorlastDegree");
	objNow=document.getElementById("elevatornowDegree");
	objFee=document.getElementById("elevatordegreeFee");
	
	isnum1=/^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/;
	isnum2=/^[1-9]d*$/;
	ismoney=/^[0-9]+(.[0-9]{1,2})?$/;
	if(isnum1.test(objLast.value)==false&&isnum2.test(objLast.value)==false){
		alert("上期度数不正确");
		objLast.focus();
		return false;
	}
	else if(isnum1.test(objNow.value)==false&&isnum2.test(objNow.value)==false){
		alert("本期度数不正确");
		objNow.focus();
		return false;
	}
	else if(ismoney.test(objFee.value)==false){
		alert("单价不正确");
		objFee.focus();
		return false;
	}
	else{
		table2height+=81;
		$("#elevatorHeight").css("height",table2height+"px");
		//更新隐藏域
		updateElev(objFee.value);
		//获取楼宇信息
		var builInfo='';
		$.ajax({
			type: "POST",
			url: "getBuilInfo?builId="+document.getElementById("builNum").value,
			dataType: "json",
			success: function(data){
				builInfo += data.info;
				var newTr = objtb.insertRow(1);
				var newTd0 = newTr.insertCell(0);
				var newTd1 = newTr.insertCell(1);
				newTr.style.verticalAlign="middle";
				newTr.style.textAlign="center";
				newTr.id="td"+rowIndex;
				newTd0.style.height="75px";
				newTd1.style.height="75px";
				newTd1.style.borderWidth="0px";
				newTd1.style.padding="0px";
				newTd1.colSpan="4";
				newTd0.innerHTML='<input type="hidden" name="builId" value="'+objNum.value+'"/>'+objNum.options[objNum.selectedIndex].text+'号楼,'+builInfo;
				newTd1.innerHTML='<div style="height:auto"><table id="buidingTable'+objNum.value+'" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
				    '<tr><td width="25%" style="width:25%;height:25px"><input type="hidden" name="lmBeginDegree" value="'+objLast.value+'"/>'+objLast.value+'</td><td width="25%"  style="width:25%;height:25px"><input type="hidden" name="lmEndDegree" value="'+objNow.value+'"/>'+objNow.value+'</td><td width="25%"  style="width:25%;height:25px"><input type="hidden" name="lmPrice" value="'+objFee.value+'"/>'+objFee.value+'</td><td width="25%"  style="width:25%;height:25px"><a href="javascript:void(0)" onclick="javascript:removeRowBuild(this)" style="color:red;text-decoration:none;">删除</a></td></tr>'+
					'<tr><td style="height:25px">起始楼层</td><td>终止楼层</td><td>比例</td><td>.</td></tr>'+
					'<tr style="background-color:#FFC;"><td style="height:25px"><input type="text" style="width:60px;"/></td><td><input type="text" style="width:60px;" /></td><td><input type="text" style="width:60px;"/></td><td><input type="button" value="添加" onclick="appendRowBuild(this)"/></td></tr>'+
					'</table></div>';
				rowIndex2++;
				
				objLast.value="";
				objNow.value="";
				objFee.value="";
				objLast.focus();
			}
		});
	}
}