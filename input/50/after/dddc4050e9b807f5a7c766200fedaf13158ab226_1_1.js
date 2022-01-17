function kInit()
{
	kDomConsole = $('.kConsole');
	kDomUpdated = $('.kLastUpdateTime');
	kDomTitle = $('#kTitle');

	$(window).bind('hashchange', kScreenUpdate);

	kLoadData(true);
}