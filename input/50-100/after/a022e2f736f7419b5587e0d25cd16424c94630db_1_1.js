function _fnBrowserDetect( oSettings )
{
	/* IE6/7 will oversize a width 100% element inside a scrolling element, to include the
	 * width of the scrollbar, while other browsers ensure the inner element is contained
	 * without forcing scrolling
	 */
	var n = $(
		'<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden">'+
			'<div style="position:absolute; top:1px; left:1px; width:100px; height:50px; overflow:scroll;">'+
				'<div id="DT_BrowserTest" style="width:100%; height:10px;"></div>'+
			'</div>'+
		'</div>')[0];

	document.body.appendChild( n );
	oSettings.oBrowser.bScrollOversize = $('#DT_BrowserTest', n)[0].offsetWidth === 100 ? true : false;
	document.body.removeChild( n );
}