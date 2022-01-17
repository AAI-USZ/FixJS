function(evt){
			dojo.publish(this.getClickTopicName(),	[{
				index: evt.target._index,
				data: evt.target._data,
				url: img.getAttribute("src"),
				largeUrl: this.imageStore.getValue(data,this.imageLargeAttr),
				title: this.imageStore.getValue(data,this.titleAttr),
				link: this.imageStore.getValue(data,this.linkAttr)
			}]);
			//
			dojo.query("." + this.cellClass, this.thumbsNode).removeClass(this.cellClass + "Selected");
			dojo.addClass(evt.target.parentNode, this.cellClass + "Selected");
			return false;
		}