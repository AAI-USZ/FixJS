function(query,callback){
	var q={};
	var one_flag=false;
	var number=parseInt(query.number) || settings.CHAT_MOTTO_LOG;
	if(query.channel){
		q.channel=query.channel;
	}
	if(query.motto){
		//time:この時間より前 until:この時間まで
		var m=query.motto;
		q.time={$lt:new Date(m.time)};
		if(m.until){
			q.time.$gte=new Date(m.until);
			//最大までにしてあげる
			if(!query.number)number=settings.CHAT_MOTTO_MAX_LOG;
		}
	}
	number=Math.min(number, settings.CHAT_MOTTO_MAX_LOG);
	if(query.id){
		one_flag=true;
		if(query.id.length!=24 && query.id.length!=12){
			callback([]);
			return;
		}
		q=db.bson_serializer.ObjectID.createFromHexString(query.id);
	}

	if(one_flag){
		//1件
		log.findOne(q,function(err,obj){
			callback([obj]);
		});
	}else{
		log.find(q,{"sort":[["time","desc"]],"limit":number}).toArray(function(err,arr){
			if(err){
				callback({error:err});
			}else{
				callback(arr);
			}
		});
	}
}