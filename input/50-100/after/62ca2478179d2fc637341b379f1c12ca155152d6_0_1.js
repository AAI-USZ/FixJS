function(){
	$.pjax({
	selector: "a[href^='http://" + location.hostname +"']",
	container: '#content', //内容替换的容器
	show: 'transparents', //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
	cache: false, //是否使用缓存
	storage: false, //是否使用本地存储
	titleSuffix: ' | Track My Memory', //标题后缀
	fitler: function(href){},
	callback: function(){}
	})
}