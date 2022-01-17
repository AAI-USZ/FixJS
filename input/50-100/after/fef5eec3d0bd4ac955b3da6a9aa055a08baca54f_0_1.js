function(data){					
			var result = data["result"];
			if(result=="Failed"){
				alert("已存在该楼号，请核对！");
				objfc1.select();
				return false;
			}
			else{
				document.getElementById("form").submit();
				alert("楼宇创建成功");
				return true;						
			}
		}