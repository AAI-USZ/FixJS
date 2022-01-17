function (clickEvent, el) {
				var extEl = Ext.get(el)
				  , parent = extEl.parent('li');
				this.fireEvent('todoRemoveSelected', this.getRecord(parent));
			}