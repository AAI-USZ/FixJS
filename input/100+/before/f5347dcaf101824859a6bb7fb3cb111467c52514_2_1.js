function(detailsView) {
	          this.detailsView = detailsView;
	          this.contact = this.detailsView.contact;
            this.inputs = {};

	          // not actually a div, but who cares :-)
	          this.div = document.createElement('form');

	          this.div.appendChild(helpers.dom.div('buttons', [
		            helpers.dom.button("&laquo; Back", this.closeAction, this),
		            helpers.dom.submit("Save")
	          ]));

	          helpers.catchEvent(this.div, 'submit', this.saveAction, this);

	          this.addInput('fn');
	          /* this.addInput('n[given-name]');
	             this.addInput('n[additional-name]');
	             this.addInput('n[family-name]');
	          */

            var emailWrapper = document.createElement('div');
            this.div.appendChild(emailWrapper);
            if(this.contact.email) {
                _.each(this.contact.email, function(email, i) {
                    this.addTypedInput('email', emailWrapper, i);
                }, this);
            } else {
	              this.addTypedInput('email', emailWrapper, 0);
            }


	          this.detailsView.div.appendChild(this.div);
	      }