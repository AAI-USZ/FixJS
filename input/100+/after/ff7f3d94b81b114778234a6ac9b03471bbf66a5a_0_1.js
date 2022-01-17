function(id,base64){
		var id=id||"1234567";
		var base64=base64||"base64";
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		var xhr = new XMLHttpRequest();

		var fd = new FormData();
			fd.append("method","SET");
			fd.append("id",id);		
			fd.append("base64",base64);

		xhr.onerror = function(e) {
			deferred.reject(xhr, e);
        }

	    xhr.onload = function(e) {
	        if (xhr.status == 200) {
	            var data=JSON.parse(xhr.response);
				//如果正确直接返回数据
				if(data.err_msg===""){
					deferred.resolve(data.id);
					//console.log(xhr);
				}
				if(data.err_msg==="key设置失败"){
					deferred.reject(xhr,"key设置失败");
				}	
	        }
	    };

		xhr.open('POST', 'http://1.lemonvoice.sinaapp.com/', true);

	    xhr.send(fd);

	    return promise;

	}