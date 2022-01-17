function(xhr){
				loadBlobToBase64(xhr.response).then(function(base64){
					localStorage.setItem(id, base64);
					base64File=base64;
					deferred.resolve(base64File);
				});
			}