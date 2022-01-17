function(e) {
	        if (xhr.status == 200) {
		        var data=JSON.parse(xhr.response);
		        console.log(xhr);
				//如果正确直接返回数据
				if(data.err_msg===""){
					deferred.resolve(data.base64);
				}
				if(data.err_msg==="无此键值"){
					deferred.reject(xhr,"无此键值");
				}	            
	        }
	    }