function(id){
		var id="1234567"||id;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		var xhr = new XMLHttpRequest();

		var fd = new FormData();
			fd.append("method","GET");
			fd.append("id",id);		
			//fd.append("base64","base64");

		xhr.onerror = function(e) {
				deferred.reject(xhr,e);
        }

	    xhr.onload = function(e) {
	        if (xhr.status == 200) {
		        var data=JSON.parse(xhr.response);
				//如果正确直接返回数据
				if(data.err_msg===""){
					deferred.resolve(data.base64);
				}
				if(data.err_msg==="无此键值"){
					deferred.reject(xhr,"无此键值");
				}	            
	        }
	    };

		xhr.open('POST', 'http://1.lemonvoice.sinaapp.com/', true);

	    xhr.send(fd);

	    return promise;

	}