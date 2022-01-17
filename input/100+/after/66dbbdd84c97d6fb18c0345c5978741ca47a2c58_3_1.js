function(actionAreaId, enableDragAndDrop) {

		eXo.ecm.UISimpleView.enableDragAndDrop = enableDragAndDrop;		

		Self.contextMenuId = "JCRContextMenu";

		Self.actionAreaId = actionAreaId;



		var actionArea = document.getElementById(actionAreaId);

		if (!actionArea) return; 

		var mousedown = null;

		var keydown = null;

		Self.allItems = gj(actionArea).find("div.ActionIconBox");

		Self.allItems.each(function(i, elem){

			if (!Array.prototype[i]) {

			var item = Self.allItems[i];

			item.storeIndex = i;

			if (item.getAttribute("onmousedown")) {

				mousedown = Self.allItems[i].getAttributeNode("onmousedown").value;

				item.setAttribute("mousedown", mousedown);

				item.onmousedown = null;

				item.removeAttribute("onmousedown");

			}

	      if (item.getAttribute("onkeydown")) {

	        keydown = Self.allItems[i].getAttributeNode("onkeydown").value;

	        item.setAttribute("keydown", keydown);

	        item.onmousedown = null;

	        item.removeAttribute("onkeydown");

	      }			

//			if (enableDragAndDrop == "true") {			

				item.onmouseover = Self.mouseOverItem;

				item.onfocus = Self.mouseOverItem;

				item.onmousedown = Self.mouseDownItem;

				item.onkeydown = Self.mouseDownItem;

				item.onmouseup = Self.mouseUpItem;

				item.onmouseout = Self.mouseOutItem;

				item.onblur = Self.mouseOutItem;

//			}

			//eXo.core.Browser.setOpacity(item, 85);

			}

		});

		actionArea.onmousedown = Self.mouseDownGround;

		actionArea.onkeydown = Self.mouseDownGround;

		actionArea.onmouseup = Self.mouseUpGround;

		actionArea.onmouseover = Self.mouseOverGround;

		actionArea.onmouseout = Self.mouseOutGround;

        actionArea.onfocus = Self.mouseOverGround;

        actionArea.onblur = Self.mouseOutGround;	

    

        var fillOutElement = document.createElement('div');

		fillOutElement.id = "FillOutElement";

		actionArea.appendChild(fillOutElement);	

		



		//remove context menu

		var contextMenu = document.getElementById(Self.contextMenuId);

		if (contextMenu) contextMenu.parentNode.removeChild(contextMenu);

		//registry action drag drop in tree list

		

//		var UIWorkingArea = DOM.findAncestorByClass(actionArea, "UIWorkingArea");

//		var UITreeExplorer = DOM.findFirstDescendantByClass(UIWorkingArea, "div", "UITreeExplorer");

//		if (UITreeExplorer) {

//			DOM.getElementsBy(

//					function(element) {return element.getAttribute("objectId");},

//					"div",

//					UITreeExplorer,

//					function(element) {

//						if (element.getAttribute("onmousedown") && !element.getAttribute("mousedown")) {

//							mousedown = element.getAttributeNode("onmousedown").value;

//							element.setAttribute("mousedown", mousedown);

//						}

//            if (element.getAttribute("onkeydown") && !element.getAttribute("keydown")) {

//              keydown = element.getAttributeNode("onkeydown").value;

//              element.setAttribute("keydown", keydown);

//            }						

//						element.onmousedown = Self.mouseDownTree;

//						element.onkeydown = Self.mouseDownTree;

//						element.onmouseup = Self.mouseUpTree;

//						element.onmouseover = Self.mouseOverTree;

//						element.onmouseout = Self.mouseOutTree;

//            element.onfocus = Self.mouseOverTree;

//            element.onblur = Self.mouseOutTree;						

//					}

//			);

//		}

		gj(actionArea).parents(".UIWorkingArea:first").find("div.UITreeExplorer:first").find("div[objectId]").each(

		function(index, element) {

			if (element.getAttribute("onmousedown") && !element.getAttribute("mousedown")) {

				mousedown = element.getAttributeNode("onmousedown").value;

				element.setAttribute("mousedown", mousedown);

			}

            if (element.getAttribute("onkeydown") && !element.getAttribute("keydown")) {

              keydown = element.getAttributeNode("onkeydown").value;

              element.setAttribute("keydown", keydown);

            }						

			element.onmousedown = Self.mouseDownTree;

			element.onkeydown = Self.mouseDownTree;

			element.onmouseup = Self.mouseUpTree;

			element.onmouseover = Self.mouseOverTree;

			element.onmouseout = Self.mouseOutTree;

            element.onfocus = Self.mouseOverTree;

            element.onblur = Self.mouseOutTree;						

		});

	}