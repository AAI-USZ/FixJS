function(evt) {

		eval("var event = ''");

		event = evt || window.event;

		event.cancelBubble = true;

		var element = this;

		removeMobileElement();

		Self.hideContextMenu();

		var d = new Date();		

    Self.t1 = d.getTime();   

		Self.enableDragDrop = true;

		Self.srcPath = element.getAttribute("objectId");

		document.onselectstart = function(){return false};

		var rightClick = (event.which && event.which > 1) || (event.button && event.button == 2);

		if (!rightClick) {

			

			if (!inArray(Self.itemsSelected, element) && !event.ctrlKey && !event.shiftKey) {

				Self.clickItem(event, element);

			};



			// init drag drop;

			document.onmousemove = Self.dragItemsSelected;

			document.onmouseup = Self.dropOutActionArea;



			//create mobile element

			var mobileElement = newElement({

				className: "UIJCRExplorerPortlet MoveItem",

				id: eXo.generateId('Id'),

				style: {

						position: "absolute",

						display: "none",

						padding: "1px",

						background: "white",

						border: "1px solid gray",

						width: document.getElementById(Self.actionAreaId).offsetWidth + "px"

				}

			});

			

			mobileElement.style.opacity = 64/100 ;

			Self.mobileId = mobileElement.getAttribute('id');

			var coverElement = newElement({className: "UIListGrid"});

			for(var i in Self.itemsSelected) {

				if (Array.prototype[i]) continue;

				var childNode = Self.itemsSelected[i].cloneNode(true);

				childNode.style.background = "#dbdbdb";

				coverElement.appendChild(childNode);

			}

			var listViewElement = newElement({className: "UIListView"});

			listViewElement.appendChild(coverElement);

			mobileElement.appendChild(listViewElement);

			document.body.appendChild(mobileElement);

		}

	}