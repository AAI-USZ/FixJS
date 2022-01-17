function(name,type,desc,final_pic_path,final_crx_path,callback){
	db.collection('ext').insert({
		name: name,
		type: type,
		desc: desc,
		final_pic_path: final_pic_path,
		final_crx_path: final_crx_path,
		like: 0,
		pass: 0,
		created: Date.now()
	},function(err,result){
		callback(err,result);
	})
}