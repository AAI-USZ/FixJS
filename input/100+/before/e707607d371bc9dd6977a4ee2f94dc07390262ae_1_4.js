function(event) {

		var event = event || window.event;

		var element = this;

		Self.enableDragDrop = true;

		Self.srcPath = element.getAttribute("objectId");

		resetArrayItemsSelected();

		var rightClick = (event.which && event.which > 1) || (event.button && event.button == 2);

		if (rightClick) {

			eval(element.getAttribute("mousedown"));

		} else {

			// init drag drop;

			document.onmousemove = Self.dragItemsSelected;

			document.onmouseup = Self.dropOutActionArea;

			

			var itemSelected = element.cloneNode(true);

			Self.itemsSelected = new Array(itemSelected);

			

			//var uiResizableBlock = DOM.findAncestorByClass(element, "UIResizableBlock");

			//if (uiResizableBlock) uiResizableBlock.style.overflow = "hidden";

			

			//create mobile element

			var mobileElement = newElement({

				className: "UIJCRExplorerPortlet",

				id: eXo.generateId('Id'),

				style: {

					position: "absolute",

					display: "none",

					overflow: "hidden",

          padding: "1px",

          background: "white",

          border: "1px solid gray",

          width: element.offsetWidth + 50 + "px",

          height: "25px"

        }

      });

      mobileElement.style.opacity = 65/100;

			Self.mobileId = mobileElement.id;

			var coverElement = newElement({

				className: "UITreeExplorer",

				style: {margin: "0px 3px", padding: "3px 0px"}

			});

			coverElement.appendChild(itemSelected);

			mobileElement.appendChild(coverElement);

			document.body.appendChild(mobileElement);

		}

	}