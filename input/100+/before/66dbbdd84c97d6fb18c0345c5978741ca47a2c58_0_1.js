function(event, clickedElement) {
		if (eXo.ecm.AutoComplete.count) {
			return false;
		}
		eXo.ecm.AutoComplete.count = 1;
		// Basic UA detection

		isIE = document.all ? true : false;
		isGecko = navigator.userAgent.toLowerCase().indexOf('gecko') != -1;
		isOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;

		var event = event || window.event;
		event.cancelBubble = true; 
		popupSelector = gj(clickedElement).parents(".UITaggingForm:first")[0];
		showBlock = gj(popupSelector).find("div.UIFormTextAreaInput:first")[0];
		itemList = gj(showBlock).find("option.Item");
		tagNameInput = gj(popupSelector).find("div.UITagNameInput:first")[0];
		inputBox = gj(tagNameInput).find("#names:first")[0];
		tags = new Array(itemList.length);
		for (var i = 0; i < itemList.length; i++) {
			var item = itemList[i];
			tags[i] = item.getAttributeNode("value").value;
		}
		eXo.ecm.AutoComplete.Tags = {'data':tags,
				'isVisible':false,
				'element': inputBox,
				'dropdown':null,
				'highlighted':null};

		eXo.ecm.AutoComplete.Tags['element'].setAttribute('autocomplete', 'off');
		eXo.ecm.AutoComplete.Tags['element'].onkeydown  = function(e) {return AutoComplete.prototype.keyDown(e);}
		eXo.ecm.AutoComplete.Tags['element'].onkeyup    = function(e) {return AutoComplete.prototype.keyUp(e);}
		eXo.ecm.AutoComplete.Tags['element'].onkeypress = function(e) {
			if (!e) e = window.event;
			if (e.keyCode ==13 || isOpera) return false;
		}
		eXo.ecm.AutoComplete.Tags['element'].ondblclick = function()  {AutoComplete.prototype.showDropdown();}
		eXo.ecm.AutoComplete.Tags['element'].onclick    = function(e) {if (!e) e = window.event; e.cancelBubble = true; e.returnValue = false;}

		// Hides the dropdowns when document clicked
		var docClick = function()
		{
			AutoComplete.prototype.hideDropdown();
		}

		if (document.addEventListener) {
			document.addEventListener('click', docClick, false);
		} else if (document.attachEvent) {
			document.attachEvent('onclick', docClick, false);
		}

		// Max number of items shown at once
		if (arguments[2] != null) {
			eXo.ecm.AutoComplete.Tags['maxitems'] = arguments[2];
			eXo.ecm.AutoComplete.Tags['firstItemShowing'] = 0;
			eXo.ecm.AutoComplete.Tags['lastItemShowing']  = arguments[2] - 1;
		}

		AutoComplete.prototype.createDropdown();

		// Prevent select dropdowns showing thru
		if (isIE) {
			eXo.ecm.AutoComplete.Tags['iframe'] = document.createElement('iframe');
			eXo.ecm.AutoComplete.Tags['iframe'].id = 'names' +'_iframe';
			eXo.ecm.AutoComplete.Tags['iframe'].style.position = 'absolute';
			eXo.ecm.AutoComplete.Tags['iframe'].style.top = '75';
			eXo.ecm.AutoComplete.Tags['iframe'].style.left = '148';
			eXo.ecm.AutoComplete.Tags['iframe'].style.width = '0px';
			eXo.ecm.AutoComplete.Tags['iframe'].style.height = '0px';
			eXo.ecm.AutoComplete.Tags['iframe'].style.zIndex = '98';
			eXo.ecm.AutoComplete.Tags['iframe'].style.visibility = 'hidden';

			eXo.ecm.AutoComplete.Tags['element'].parentNode.insertBefore(eXo.ecm.AutoComplete.Tags['iframe'], eXo.ecm.AutoComplete.Tags['element']);
		}
	}