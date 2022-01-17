function(key, step) {
	var zi = baidu.global.get("zIndex");
	if (key) {
		zi[key] = zi[key] + (step || 1);
	}
	return zi[key];
}