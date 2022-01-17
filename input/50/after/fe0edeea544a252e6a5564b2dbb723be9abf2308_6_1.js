function(evt){
			eXo.cs.EventManager.cancelBubble(evt);
			eXo.cs.DragDrop.init(null,this,moreContainerNode,evt);
		}