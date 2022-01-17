function getElementDefaultDisplay(el) {
		var testElem,
			getComputedStyle = global.getComputedStyle,
			cStyle = el.currentStyle || getComputedStyle(el, "");

		if (cStyle.display === "none") {
			testElem = document.createElement(el.nodeName),
			document.body.appendChild(testElem);
			cStyle = (getComputedStyle ? getComputedStyle(testElem, "") : testElem.currentStyle).display;
			document.body.removeChild(testElem);
		}
		return cStyle;
	}