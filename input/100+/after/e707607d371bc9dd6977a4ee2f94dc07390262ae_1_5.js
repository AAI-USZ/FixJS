function(evt) {

		eval("var event = ''");

		event = evt || window.event;

		var element = this;

		revertResizableBlock();

		Self.enableDragDrop = null;

		var mobileElement = document.getElementById(Self.mobileId);

		if (mobileElement && mobileElement.move) {

			//post action

			var actionArea = document.getElementById("UIWorkingArea");

			var moveAction = gj(actionArea).find("div.JCRMoveAction:first")[0];

			var wsTarget = element.getAttribute('workspacename');

			var idTarget = element.getAttribute('objectId');



			var targetPath = decodeURIComponent(idTarget);

			var srcPath = decodeURIComponent(Self.srcPath);

			if (targetPath.indexOf(srcPath) == 0) {

				delete Self.srcPath;

				return;

			}

//			var regex = new RegExp("^"+decodeURIComponent(idTarget) + "/");

//			var regex1 = new RegExp("^"+decodeURIComponent(Self.srcPath) + "/");

//			if(regex.test(decodeURIComponent(Self.srcPath) + "/")){

//			  delete Self.srcPath;

//			  return ;

//			}

//			if(regex1.test(decodeURIComponent(idTarget) + "/")) {

//			  delete Self.srcPath;

//			  return;

//			}

			

			//Dunghm : check symlink

			if (eXo.ecm.UISimpleView.enableDragAndDrop == "true") {

				if(event.ctrlKey && event.shiftKey)

				  Self.postGroupAction(moveAction.getAttribute("symlink"), "&destInfo=" + wsTarget + ":" + idTarget);

				else

				  Self.postGroupAction(moveAction, "&destInfo=" + wsTarget + ":" + idTarget);

			}

		}

	}