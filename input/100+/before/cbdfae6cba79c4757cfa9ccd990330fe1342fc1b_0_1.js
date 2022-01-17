function() {
			var anis = animations[wid],
				ani,
				prop,
				node,
				i = 0,
				j = anis && anis.length,
				result = false;

			while (i < j) {
				if (anis[i].id === id) {
					ani = anis[i];
					node = ani.elem.domNode;

					for (prop in ani.props) {
						j = ani.props[prop][0];
						style.set(node, prop, positionOptions[prop] && prop !== "opacity" ? j + "px" : j);
					}

					anis.splice(i, 1);
					if (!anis.length) {
						delete animations[wid];
					}

					result = true;

					break;
				}
			}

			anim.fireEvent("cancel");

			return result;
		}