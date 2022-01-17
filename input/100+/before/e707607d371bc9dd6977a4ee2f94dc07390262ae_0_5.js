function(event) {

		var event = event || window.event;

		var element = this;

		revertResizableBlock();

		Self.enableDragDrop = null;

		var mobileElement = document.getElementById(Self.mobileId);

		if (!mobileElement && eXo.ecm.UISimpleView && eXo.ecm.UISimpleView.mobileId)

			mobileElement = document.getElementById(eXo.ecm.UISimpleView.mobileId);

		

//		Self.clickItem(event, element);		

		if (mobileElement && mobileElement.move) {

			//post action

			var actionArea = document.getElementById("UIWorkingArea");

			var moveAction = gj(actionArea).find("div.JCRMoveAction:first")[0];

			var wsTarget = element.getAttribute('workspacename');

			var idTarget = element.getAttribute('objectId');

			var targetPath = decodeURIComponent(idTarget);

			var srcPath = Self.srcPath ?  decodeURIComponent(Self.srcPath) :

				decodeURIComponent(eXo.ecm.UISimpleView.srcPath);

//			var regex = new RegExp("^"+decodeURIComponent(idTarget) + "/");

//			alert("^"+decodeURIComponent(idTarget) + "/" + "\n" + "^"+decodeURIComponent(Self.srcPath) + "/");

//			var regex1 = new RegExp("^"+decodeURIComponent(Self.srcPath) + "/");

//			alert(regex.test(decodeURIComponent(Self.srcPath) + "/") + "\n" + regex1.test(decodeURIComponent(idTarget) + "/"))

//			if(regex.test(decodeURIComponent(Self.srcPath) + "/")){

//			  delete Self.srcPath;

//			  return ;

//			}

//			if(regex1.test(decodeURIComponent(idTarget) + "/")) {

//			  delete Self.srcPath;

//			  return;

//			}

			if (targetPath.indexOf(srcPath) == 0) {

				delete Self.srcPath;

				return;

			}

			//Dunghm : check symlink

			if (eXo.ecm.UIListView.enableDragAndDrop == "true") {

				if(event.ctrlKey && event.shiftKey)

				  Self.postGroupAction(moveAction.getAttribute("symlink"), "&destInfo=" + wsTarget + ":" + idTarget);

				else {

				  Self.postGroupAction(moveAction, "&destInfo=" + wsTarget + ":" + idTarget);

				}

			}			

		}

//		Self.clickItem(event, element);		

	}