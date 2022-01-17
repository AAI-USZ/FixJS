function(key, step){
	if(key)
		key = baidu.global.get("zIndex")[key] = baidu.global.get("zIndex")[key] + (step || 1);
    return key;
}