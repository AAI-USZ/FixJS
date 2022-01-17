function(){
			var dimension, scroll, actives, hasData;

			if(this.transitioning){ return; }

			dimension = this.dimension();
			scroll = string.toCamel(['scroll', dimension].join('-'));
			actives = this.parent && query('> .accordion-group > .in', this.parent);

			if(actives && actives.length){
				hasData = nodeData.get(actives[0], 'collapse');
				if(hasData && hasData.transitioning){ return; }
				actives.collapse('hide');
				hasData || nodeData.set(actives[0], 'collapse', null);
			}

			domStyle.set(this.domNode, dimension, 0);
			this.transition('add', 'show', 'shown');
			domStyle.set(this.domNode, dimension, this.domNode[scroll]);
		}