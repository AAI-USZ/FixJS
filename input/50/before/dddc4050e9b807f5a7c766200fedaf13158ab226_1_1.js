function kInit()
{
	kDomConsole = $('.kConsole');
	kDomUpdated = $('.kLastUpdateTime');

	$(window).bind('hashchange', kScreenUpdate);

	kLoadData();
}