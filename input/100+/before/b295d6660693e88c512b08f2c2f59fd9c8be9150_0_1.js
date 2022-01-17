function parseCobj(cstr){
	//去掉任何空格
	cstr = cstr.replace(/\s+/g, '');
	var pairs = cstr.split(';');  //分离多个键值对

	var attrs,k,v; // = cstr.split(/[:;]/);  //全都隔开之后,数组中两两一对,碰到名字是空就停止(那是最后一个;号split产生的)
	var obj = {};  //内容都放到这里
	while(pairs[0]){  //
		if(!pairs[0].length) continue;
		if(attrs = pairs[0].match(RegExp_KEYVALUE)){
			k = attrs[1];
			v = attrs[3];
			//判断是否带引号的，要把引号删掉
			if( attrs[2] && v[v.length] == attrs[2]){  //正则里面()引用如果不存在的话，那一项匹配返回undefined
				obj[k] = v.substr(0, v.length - 1);
			}else{
				obj[k] = v;
			}	
		}
		pairs.shift();  //已经确认,js中赋值操作会先执行等号左边的那个shift()
	}

	return obj;
}