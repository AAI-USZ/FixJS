function loadSettings() {
    var auto_cookie = $.cookie('auto');
    var sfw_cookie = $.cookie('sfw');
    var theme_cookie = $.cookie('theme');
    if(auto_cookie != null && auto_cookie != auto){
	auto = (auto_cookie == 'true') ? true : false;
	$('#auto').attr('checked', auto);
    }
    if(sfw_cookie != null && sfw_cookie != sfw){
	sfw = (sfw_cookie == 'true') ? true : false;
	$('#sfw').attr('checked', sfw);
    }
    if(theme_cookie !== null && theme_cookie != theme){
        theme = theme_cookie;
    }
}