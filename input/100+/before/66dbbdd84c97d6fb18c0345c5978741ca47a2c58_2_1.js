function(actionAreaId, enableDragAndDrop) {

		eXo.ecm.UIListView.enableDragAndDrop = enableDragAndDrop;

		Self.contextMenuId = "JCRContextMenu";

		Self.actionAreaId = actionAreaId;

		var actionArea = document.getElementById(actionAreaId);

		if (!actionArea) return;

		Self.allItems = gj(actionArea).find("div.RowView");

		var mousedown = null;

		var keydown = null;

		for (var i in Self.allItems) {

			if (Array.prototype[i]) continue;

			var item = Self.allItems[i];

			item.storeIndex = i;

			if (item.getAttribute("onmousedown")) {

				mousedown = item.getAttributeNode("onmousedown").value;

				item.setAttribute("mousedown", mousedown);

				item.onmousedown = null;

				item.removeAttribute("onmousedown");

			}

            if (item.getAttribute("onkeydown")) {

                keydown = item.getAttributeNode("onkeydown").value;

                item.setAttribute("keydown", keydown);

                item.onkeydown = null;

                item.removeAttribute("onkeydown");

            }			

			item.onmouseover = Self.mouseOverItem;

			item.onfocus = Self.mouseOverItem;

			item.onmousedown = Self.mouseDownItem;

			item.onkeydown = Self.mouseDownItem;

			item.onmouseup = Self.mouseUpItem;

			item.onmouseout = Self.mouseOutItem;

			item.onblur = Self.mouseOutItem;

		}

		actionArea.onmousedown = Self.mouseDownGround;

		actionArea.onkeydown = Self.mouseDownGround;

		actionArea.onmouseup = Self.mouseUpGround;

		

		var fillOutElement = document.createElement('div');

		fillOutElement.id = "FillOutElement";

		

		var listGrid = gj(actionArea).find("div.UIListGrid:first")[0];

		if (listGrid) {

			listGrid.appendChild(fillOutElement);

		}

		

		//remove context menu

		var contextMenu = document.getElementById(Self.contextMenuId);

		if (contextMenu) contextMenu.parentNode.removeChild(contextMenu);

		//registry action drag drop in tree list

		eXo.ecm.UIListView.initDragDropForTreeEvent("UIWorkingArea", enableDragAndDrop);		

//		var UIWorkingArea = DOM.findAncestorByClass(actionArea, "UIWorkingArea");

//		var UITreeExplorer = DOM.findFirstDescendantByClass(UIWorkingArea, "div", "UITreeExplorer");

//		if (UITreeExplorer) {

//			DOM.getElementsBy(

//					function(element) {return element.getAttribute("objectId");},

//					"div",

//					UITreeExplorer,

//					function(element) {

//						if (element.getAttribute("onmousedown")) {

//							mousedown = element.getAttributeNode("onmousedown").value;

//							element.setAttribute("mousedown", mousedown);

//						}

//						if (enableDragAndDrop == "true") {

//							element.onmousedown = Self.mouseDownTree;

//							element.onmouseup = Self.mouseUpTree;

//							element.onmouseover = Self.mouseOverTree;

//							element.onmouseout = Self.mouseOutTree;

//						}

//					}

//			);

//		}

	}