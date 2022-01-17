function Engage() {

		this.createResource = function (course_id,title,description,resource_type,file_type,url,callback){
			console.log('API - createResource');
			var body = {};
			var resource = {};
			resource.course = course_id;
			resource.title = title;
			resource.description = description;
			resource.resourceType = resource_type;
			resource.fileType = file_type;
			resource.url = url;

			$.ajax({

				url:'/api/resource',
				type:'POST',
				dataType:'json',
				contentType:"application/json",
				data:JSON.stringify(body),
				success:function (data) {
					callback(data);

				}

			})

		}

		this.starResource = function(resource_uuid,callback){
			console.log("API - starResource");
			$.ajax({

				url:'/api/resource/'+ resource_uuid+'/star',
				type:'POST',
				success:function (data) {
					callback(data);

				}

			})

		}

		this.unstarResource = function(resource_uuid,callback){
			console.log("API - unstarResource");
			$.ajax({

				url:'/api/resource/'+ resource_uuid+'/star',
				type:'DELETE',
				success:function (data) {
					callback(data);

				}

			})

		}



	}