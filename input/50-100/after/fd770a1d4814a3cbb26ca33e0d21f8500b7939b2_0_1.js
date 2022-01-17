function(){

	var container = document.createElement('div');

		container.setAttribute('id','UpdateYourBrowser');

		

	document.body.appendChild(container);

	

	var content = 

	'<!--[if lt IE 9]>'+

			'<style type="text/css">'+

				'#UpdateYourBrowser{z-index:2147483647;position:absolute;left:25%;top:25%;}'+

			'</style>'+

				'<img src="https://raw.github.com/adius/UpdateYourBrowser/master/img/default_en.png" alt="Update your browser!" width="640px" height="340px" usemap="#linkmap" />'+

				'<map name="linkmap" id="linkmap">'+

					'<area shape="circle" coords="622,18,16"  style="cursor:pointer" onclick="getElementById(\'UpdateYourBrowser\').style.display = \'none\';" title="Close Window" alt="Close Window" />'+

					'<area shape="rect" coords="60,180,170,320" href="http://mozilla.com/" target="_blank" title="Download Firefox" alt="Download Firefox" />'+

					'<area shape="rect" coords="200,180,310,320" href="http://google.com/chrome" target="_blank"  title="Download Google Chrome" alt="Download Google Chrome" />'+

					'<area shape="rect" coords="340,180,450,320" href="http://opera.com/download/" target="_blank" title="Download Opera" alt="Download Opera" />'+

					'<area shape="rect" coords="480,180,590,320" href="http://apple.com/safari/download/" target="_blank" title="Download Apple Safari" alt="Download Apple Safari" />'+

				'</map>'+

	'<![endif]-->';

	

	container.innerHTML = content;

	

}