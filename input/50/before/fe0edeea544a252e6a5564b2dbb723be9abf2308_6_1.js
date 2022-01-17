function(evt){
			eXo.cs.EventManager.cancelBubble(evt);
			eXo.core.DragDrop.init(null,this,moreContainerNode,evt);
		}