function(markupObject) {

			// change the markup

			this.changeMarkup(this.getRangeObject(), markupObject, this.getStandardTagComparator(markupObject));



			// merge text nodes

			GENTICS.Utils.Dom.doCleanup({'merge' : true}, this.rangeObject);



			// update the range and select it

			this.rangeObject.update();

			this.rangeObject.select();

		}