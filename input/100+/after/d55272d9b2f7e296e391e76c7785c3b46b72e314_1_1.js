function(callback){
			console.log("API - unstarResource");
			$.ajax({

				url:'/api/resources/starred',
				type:'GET',
				success:function (data) {
					callback(data);

				}

			})

		}