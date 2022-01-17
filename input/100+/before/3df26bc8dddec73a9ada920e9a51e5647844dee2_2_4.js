function createPopup(lyrContent){

	runHook("createPopup", FBEFORE);



	if (o3_wrap) {

		var wd,ww,theObj = (olNs4 ? over : over.style);

		theObj.top = theObj.left = ((olIe4&&!olOp) ? 0 : -10000) + (!olNs4 ? 'px' : 0);

		layerWrite(lyrContent);

		wd = (olNs4 ? over.clip.width : over.offsetWidth);

		if (wd > (ww=windowWidth())) {

			lyrContent=lyrContent.replace(/\&nbsp;/g, ' ');

			o3_width=ww;

			o3_wrap=0;

		}

	}



	layerWrite(lyrContent);



	// Have to set o3_width for placeLayer() routine if o3_wrap is turned on

	if (o3_wrap) o3_width=(olNs4 ? over.clip.width : over.offsetWidth);



	runHook("createPopup", FAFTER, lyrContent);



	return true;

}