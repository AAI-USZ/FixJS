function(el, nocash){
				Slick.uidOf(el);
				if (!nocash && !el.$family && !(/^(?:object|embed)$/i).test(el.tagName)){
					el._fireEvent = el.fireEvent;
					Object.append(el, Element.Prototype);
				}
				return el;
			}