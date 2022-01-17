function() {

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

				}