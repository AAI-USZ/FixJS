function(user){
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		//得到所有的ACTIONS，然后过滤掉那些没有转播的，就得到了自己的我说
		//然后从自己的我说中取有特殊标记的第一个，如果没有...恭喜你，取消上传
		var user_url_out="http://www.douban.com/people/"+user+"/";
		var temp="http://www.douban.com/people/47044744/";
		var user_url=$("div.bd p.text a[href=\""+user_url_out+"\"]:first");
		//.attr("data-sid");
		var data_sid=user_url.parent().parent().parent().parent().attr("data-sid");
				//如果得到了SID，搞定，返回
				if(data_sid){
						deferred.resolve(data_sid);
				}
				else{
						var e="Not found!";
						deferred.reject(e);
				}
		return promise;
	}