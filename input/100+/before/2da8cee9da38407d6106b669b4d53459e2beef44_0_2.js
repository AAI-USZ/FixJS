function () {
				var node = this.getRootNode().findChild("footprintId", draggedRecord.get("footprintId"), true);
				
				var targetNode = this.getRootNode().findChild("id", droppedOn.get("id"), true);
				targetNode.expand();
				
				node.remove();
				
				targetNode.appendChild(node);
				
				var oldRecordIndex = PartKeepr.getApplication().getFootprintStore().find("id", draggedRecord.get("footprintId"));
				var oldRecord = PartKeepr.getApplication().getFootprintStore().getAt(oldRecordIndex);

				oldRecord.set("category", droppedOn.get("id"));
				
			}