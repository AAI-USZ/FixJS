function(e) {
                this._unpoll();
                if (getSelection() !== sub._selection) {
                    sub._selection = '';
                    sub._notifier.fire({selection: sub._selection, pageX: e.pageX, pageY: e.pageY});
                }
            }