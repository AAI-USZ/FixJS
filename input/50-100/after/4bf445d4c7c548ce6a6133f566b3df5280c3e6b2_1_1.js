function(event){

		if(this == event.editor){

			var context = this.getContext();

			var flowLayout = context.getFlowLayout();

			var layout = flowLayout ? 'flow' : 'absolute';

			this._updateLayoutDropDownButton(layout);

		}

	}