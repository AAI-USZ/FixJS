function(data){					
			var result = data["result"];
			if(result=="Failed"){
				alert("已存在同名小区，请核对！");
				objfc1.select();
				return false;
			}else {
				document.getElementById("form").submit();
				alert("小区创建成功");
				return true;						
			}
		}