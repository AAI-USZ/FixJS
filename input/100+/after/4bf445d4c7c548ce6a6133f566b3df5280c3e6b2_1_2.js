function (newMode) {

		if (this._displayMode!="design") {

			this._bc.removeChild(this._srcCP);

			this.htmlEditor.setVisible(false);

		}



		// reset any settings we have used

		this._designCP.set("region", "center");

		delete this._designCP.domNode.style.width;

		delete this._srcCP.domNode.style.width;



		switch (newMode) {

			case "design":

				break;

			case "source":

				// we want to hide the design mode.  So we set the region to left

				// and manually set the width to 0.

				this._designCP.set("region", "left");

				this._designCP.domNode.style.width = 0;

				this._srcCP.set("region", "center");

				break;

			case "splitVertical":

				this._designCP.domNode.style.width = "50%";

				this._srcCP.set("region", "right");

				this._srcCP.domNode.style.width = "50%";

				this._bc.set("design", "sidebar");

				break;

			case "splitHorizontal":

				this._designCP.domNode.style.height = "50%";

	

				this._srcCP.set("region", "bottom");

				this._srcCP.domNode.style.height = "50%";

	

				this._bc.set("design", "headline");

		}



		if (newMode!="design") {

			this._bc.addChild(this._srcCP);

			this.htmlEditor.setVisible(true);

		}



		this._displayMode=newMode;



		// now lets relayout the bordercontainer

		this._bc.layout();



		if (newMode!="design") {

			this.htmlEditor.editor.getTextView().resize();

		}

	}