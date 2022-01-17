function (target_id, callback){
			console.log("API - getCommentsByTargetId");
			$.ajax({
				url:'/api/question/'+target_id+'/comments',
				type:'GET',
				success:function (data) {
					callback(data);
				}
			});
		}