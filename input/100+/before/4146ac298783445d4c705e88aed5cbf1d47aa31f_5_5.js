function() {
				if(!(_String_contains.call(_labelable_elements, " " + this.nodeName.toUpperCase() + " ")))
					return void 0;

				var node = this,
					/**
					 * represents the list of label elements, in [!]tree order[!]
					 * @type {Array}
					 */
					result = this.id ?
						_Array_from(document.querySelectorAll("label[for='" + this.id + "']")) :
						[],
					_lastInTreeOrder_index = result.length - 1;

				while((node = node.parentNode) && (!node.control || node.control === this))
					if(node.nodeName.toUpperCase() === "LABEL") {

						while(result[_lastInTreeOrder_index] &&
							result[_lastInTreeOrder_index].compareDocumentPosition(node) & 2)//DOCUMENT_POSITION_PRECEDING
							_lastInTreeOrder_index--;
						_Array_splice.call(result, _lastInTreeOrder_index + 1, 0, node)
					}

				return result;
			}