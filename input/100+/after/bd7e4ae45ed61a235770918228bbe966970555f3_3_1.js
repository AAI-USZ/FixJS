function() {
			var model = this.model;

			this.controller = this.options.controller;

			model.on('change:disabled', this._handleDisabledChange, this);
			model.on('change:value', this._handleValueChange, this);
			model.on('change:max', this._handleMaxChange, this);
			model.on('change:min', this._handleMinChange, this);
			model.on('sp:revert:value', this._handleRevertChange, this);

			this.template = $(model.getTemplate()).html();

			this.render();
		}