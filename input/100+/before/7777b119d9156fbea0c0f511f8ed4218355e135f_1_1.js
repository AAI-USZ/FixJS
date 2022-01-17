function() {
        var statement = this.promptEl.getValue();
        // make sure the statement is not only whitespace
        // use statement != "" if pure whitespace should be evaluated
        if (!this.evaluating && !statement.match(/^\s*$/)) {
            this.setEvaluating(true);

            var data = {
                print_statement: this.getValue().split('\n'),
                statement: statement,
                printer: this.printerEl.getValue(),
                session: this.session || null,
                privacy: this.recordEl.getValue()
            };

            var value = this.prefixStatement();

            this.clearValue();
            this.updatePrompt();

            this.history.push('');
            this.historyCursor = this.history.length - 1;

            Ext.DomHelper.append(this.outputEl, {
                tag: 'div',
                html: SymPy.escapeHTML(value)
            });

            this.scrollToDefault();
			
			if (navigator.userAgent.match(/like Mac OS X/i)) { 
                timeout = 58; // On an iOS Device
			} else {
				timeout = 61; // Not iOS based
			}
            Ext.Ajax.request({
                method: 'POST',
                url: (this.basePath || '') + '/evaluate',
				timeout: (timeout * 1000),
                jsonData: Ext.encode(data),
                success: function(response) {
                    this.done(response);
                    this.focus();
                },
                failure: function() {
					Ext.DomHelper.append(this.outputEl, {
					tag: 'div',
					html: 'Error: Time limit exceeded.'
					}
					);
					this.scrollToDefault();
                    this.clearValue();
                    this.updatePrompt();
                    this.setEvaluating(false);
                    this.focus();
                },
                scope: this
            });
            this.focus();
        }
    }