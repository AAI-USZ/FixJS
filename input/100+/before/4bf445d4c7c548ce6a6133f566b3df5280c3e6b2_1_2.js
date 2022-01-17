function (selection) {

	    /*

	     * we do not want to drive selection on the view editor unless:

	     *     - we are in an editor mode which has a view editor (not source mode)

	     *     - we are the current editor

	     */

		if( this._displayMode == "source" || davinci.Runtime.currentEditor !== this ) {

			return;

		}

		

		this._selectionCssRules = null;

		if ( selection.length ) {

			var htmlElement = selection[0].model;

			if ( htmlElement && htmlElement.elementType == "HTMLElement" ) {

				var id = htmlElement.getAttribute("id");

				if ( id && this._displayMode!="source" ) {

					var widget = widgetUtils.byId(id, this.visualEditor.context.getDocument());

					this.visualEditor.context.select(widget);

				}

			}

		}

	}