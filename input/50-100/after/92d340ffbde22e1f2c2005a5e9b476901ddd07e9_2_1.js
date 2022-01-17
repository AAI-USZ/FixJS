function (target_id, page, callback){
			console.log("API - getCommentsByTargetId");
			$.ajax({
				url:'/api/question/'+target_id+'/comments/' + page,
				type:'GET',
				success:function (data) {
					callback(data);
				}
			});
		}