function(url){
	// summary:
	//		Create iframe to load external app at specified url, and call iframeLoad() when that URL finishes loading

	dojo.ready(function(){
		var emptyStyle = {
			overflow: dojo.isWebKit ? 'hidden' : 'visible',
			margin: '0px',
			borderWidth: '0px',
			height: '100%',
			width: '100%'
		};
		dojo.style(document.documentElement, emptyStyle);
		dojo.style(document.body, emptyStyle);

		// write the iframe
		iframe = document.createElement('iframe');
		iframe.src = url;
		iframe.setAttribute("ALLOWTRANSPARENCY","true");
		iframe.scrolling = dojo.isIE? "yes" : "auto";
		var scrollRoot = (document.compatMode == 'BackCompat')? document.body : document.documentElement;
		var consoleHeight = document.getElementById('robotconsole').offsetHeight;
		dojo.style(iframe, {
			visibility:'hidden',
			border:'0px none',
			padding:'0px',
			margin:'0px',
			position:'absolute',
			left:'0px',
			top:'0px',
			width:'100%',
			height: consoleHeight ? (scrollRoot.clientHeight - consoleHeight)+"px" : "100%"
		});
		if(iframe['attachEvent'] !== undefined){
			iframe.attachEvent('onload', iframeLoad);
		}else{
			dojo.connect(iframe, 'onload', iframeLoad);
		}
		document.body.appendChild(iframe);

		var base=document.createElement('base');
		base.href=iframe.src;
		document.getElementsByTagName("head")[0].appendChild(base);
	});
}