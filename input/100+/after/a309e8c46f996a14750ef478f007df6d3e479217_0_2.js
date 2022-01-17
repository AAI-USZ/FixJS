function smf_addButton(sButtonStripId, bUseImage, oOptions)

{

	var oButtonStrip = document.getElementById(sButtonStripId);

	var aItems = oButtonStrip.getElementsByTagName('span');



	// Remove the 'last' class from the last item.

	if (aItems.length > 0)

	{

		var oLastSpan = aItems[aItems.length - 1];

		oLastSpan.className = oLastSpan.className.replace(/\s*last/, 'position_holder');

	}



	// Add the button.

	var oButtonStripList = oButtonStrip.getElementsByTagName('ul')[0];

	var oNewButton = document.createElement('li');

	setInnerHTML(oNewButton, '<a href="' + oOptions.sUrl + '" ' + ('sCustom' in oOptions ? oOptions.sCustom : '') + '><span class="last"' + ('sId' in oOptions ? ' id="' + oOptions.sId + '"': '') + '>' + oOptions.sText + '</span></a>');



	oButtonStripList.appendChild(oNewButton);

}