function (node) {
			return HTMLArea.isIEBeforeIE9 ? node.innerText : node.textContent;;
		}