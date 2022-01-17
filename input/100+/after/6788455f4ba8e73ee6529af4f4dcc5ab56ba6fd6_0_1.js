function(index){
		index = index === undefined ? this.sizers.length : index;

		// TODO: use a template for this!!!
		var sizer = this.ownerDocument.createElement('div');
		sizer.id=registry.getUniqueId('dijit_layout_SplitterContainer_Splitter');
		this.sizers.splice(index,0,sizer);
		this.domNode.appendChild(sizer);

		sizer.className = this.isHorizontal ? 'dijitSplitContainerSizerH' : 'dijitSplitContainerSizerV';

		// add the thumb div
		var thumb = this.ownerDocument.createElement('div');
		thumb.className = 'thumb';
		sizer.appendChild(thumb);

		// FIXME: are you serious? why aren't we using mover start/stop combo?
		this.connect(sizer, "onmousedown", '_onSizerMouseDown');

		dom.setSelectable(sizer, false);
	}