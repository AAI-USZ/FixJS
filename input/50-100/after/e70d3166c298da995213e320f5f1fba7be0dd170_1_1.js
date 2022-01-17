function (clickEvent, el) {
				var extEl = Ext.get(el)
				  , record = this.getRecord(extEl.parent('li'))
				  , self = this;

				  // Todo this is clearly not the best way to do this, but without this we get an error when
				  // the item that was clicked is removed.
				  setTimeout(function () { self.fireEvent('todoRemoveSelected', record); }, 1);
			}