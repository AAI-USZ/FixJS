function handleKeys(event){

	var code = event.keyCode, fn = $.inArray;

	var _ = (fn(code, keys.closeKeys) >= 0) ? function(){}()

		: (fn(code, keys.firstKeys) >= 0) ? firstImage()

		: (fn(code, keys.nextKeys) >= 0) ? nextImage()

		: (fn(code, keys.previousKeys) >= 0) ? prevImage()

		: (fn(code, keys.lastKeys) >= 0) ? lastImage()

		: (fn(code, keys.promoteKeys) >= 0) ? function(){

			if(event.ctrlKey){

				createRibbon('next')

			}

			shiftImageDown()

		}()

		: (fn(code, keys.demoteKeys) >= 0) ? function(){

			if(event.ctrlKey){

				createRibbon('prev')

			}

			shiftImageUp()

		}()

		: (fn(code, keys.downKeys) >= 0) ? function(){

			if(event.shiftKey){

				if(event.ctrlKey){

					createRibbon('next')

				}

				shiftImageDown()

			} else {

				focusBelowRibbon()

			}

		}()

		: (fn(code, keys.upKeys) >= 0) ? function(){

			if(event.shiftKey){

				if(event.ctrlKey){

					createRibbon('prev')

				}

				shiftImageUp()

			} else {

				focusAboveRibbon()

			}

		}()

		: (fn(code, keys.toggleRibbonView) >= 0) ? toggleRibbonView()

		: (fn(code, keys.ignoreKeys) >= 0) ? false

		// XXX

		: (keys.helpShowOnUnknownKey) ? function(){alert(code)}()

		: false;

	return false;

}