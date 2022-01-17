function(){
		var emptyStyle = {
			overflow: dojo.isWebKit? 'hidden' : 'visible',
			margin: '0px',
			borderWidth: '0px',
			height: '100%',
			width: '100%'
		};
		dojo.style(document.documentElement, emptyStyle);
		dojo.style(document.body, emptyStyle);
		document.body.appendChild(iframe);
		var base=document.createElement('base');
		base.href=iframe.src;
		document.getElementsByTagName("head")[0].appendChild(base);
	}