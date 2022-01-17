function updateFireInfoState(deviceNum,state){
	  $.ajax(
				{
					type:'POST',
					url:'fire/updateFireInfoState',
					data:{'deviceNum':''+deviceNum+'','state':state},
					dataType:"json",
					success:function(msg){
						window.parent.makeRequest();
					},
					error:function(resut){
					    alert("处理警报错误!");
					}
				}
	   );
  }