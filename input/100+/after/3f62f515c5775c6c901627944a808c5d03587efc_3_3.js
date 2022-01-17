function(rangeObject, startOrEnd, markupObject, tagComparator, limitObject) {

			var

				domObj = !startOrEnd?rangeObject.startContainer:rangeObject.endContainer,

				that = this,

				parents = jQuery(domObj).parents(),

				returnVal = false,

				i = -1;

			

			// check if a comparison method was passed as parameter ...

			if (typeof tagComparator !== 'undefined' && typeof tagComparator !== 'function') {

				Aloha.Log.error(this,'parameter tagComparator is not a function');

			}

			// ... if not use this as standard tag comparison method

			if (typeof tagComparator === 'undefined') {

				tagComparator = function(domobj, markupObject) {

					return that.standardTextLevelSemanticsComparator(domobj, markupObject); // TODO should actually be this.getStandardTagComparator(markupObject)

				};

			}

		

			if (parents.length > 0) {

				parents.each(function() {

					// the limit object was reached (normally the Editable Element)

					if (this === limitObject) {

						Aloha.Log.debug(that,'reached limit dom obj');

						return false; // break() of jQuery .each(); THIS IS NOT THE FUNCTION RETURN VALUE

					}

					if (tagComparator(this, markupObject)) {

						if (returnVal === false) {

							returnVal = [];

						}

						Aloha.Log.debug(that,'reached object equal to markup');

						i++;

						returnVal[i] = this;

						return true; // continue() of jQuery .each(); THIS IS NOT THE FUNCTION RETURN VALUE

					}

				});

			}

			return returnVal;

		}