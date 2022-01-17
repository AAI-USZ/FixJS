function() {
		var $linkActionElement = $(this.getHtmlElement());

		// only remove the disabled state if it is not a submit button.
		// we let FormHandler remove that after a form is submitted.
		if (!this.getHtmlElement().is(':submit')) {
			this.removeDisabledCssClass_();
		}

		var actionRequestUrl = this.getUrl();
		if (this.getHtmlElement().is('a') && actionRequestUrl) {
			$linkActionElement.attr('href', actionRequestUrl);
		}
		this.unbind('click', this.noAction_);
		this.bindActionRequest();
	}