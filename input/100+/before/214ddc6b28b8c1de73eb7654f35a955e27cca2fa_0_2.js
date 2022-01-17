function(err, articleObj){		
			if(err) return res.r404();
			commentApi.show(aid, function(err, commentArray){
				userApi.findOne(uid, function(err, userdoc){
					var cont = {//文章详细内容
							id:articleObj['_id'].toString(),
							authorface:articleObj['face'],
							authorid:articleObj['author'],
							title:articleObj['title'],
							authorname:articleObj['authorname'],
							authorcreatetime:stool.fdate('y-m-d h:m:s', articleObj['timestamp']),
							content:articleObj['content'],
							imgs:[articleObj['url']],
							commetnum:articleObj['comment']||0,
							lovenum:articleObj['love']||0,	
							islove:true,
							isfriend:false,
							type:articleObj['type'],
						};
					commentArray.forEach(function(v,i){//评论模块
						v.timestamp = stool.fdate('y-m-d', v.timestamp);
					});

					userdoc.lovenum = userdoc.love.length;//用户模块
					userdoc.friendsnum = userdoc.friends.length;

					cont.islove = ~userdoc.love.indexOf(aid)?true:false;//是否关注
					cont.isfriend = ~userdoc.friends.indexOf(articleObj['author'])?true:false;
					
					ismy = userdoc._id == cont.authorid?true:false;
					res.render('/content.jade', {pagetitle:title+'-'+cont.title, user:userdoc, content:cont, commentlist:commentArray, ismy:ismy});			
					
					});//获取用户信息
			
			});//评论内容获取完毕
	
		}