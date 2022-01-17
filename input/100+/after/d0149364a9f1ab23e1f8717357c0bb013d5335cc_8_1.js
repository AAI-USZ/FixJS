function(options) {

			this._playerBinder = new Backbone.ModelBinder();
			this.showModel = options.showModel || new ShowModel();
			this.audioEl = options.liveStreamEl;
			
			if (!_.isObject(this.model)) {
				this.model = new PlayerModel({
					volume: this.audioEl.volume * 10,
					muted: this.audioEl.muted
				});
			}
			this._playerFsm = new PlayerFsm(options.liveStreamEl, this.model);
			_.bindAll(this, "handlePlayerError");
			this._playerFsm.on("error", this.handlePlayerError);

			// Bind Model Event Handlers
			this.bindTo(this.model, "change:message", this.handleModelChangeMessage);
			this.bindTo(this.model, "change:paused", this.handleModelChangePaused);
			this.bindTo(this.model, "change:muted", this.handleModelChangeMuted);
			this.bindTo(this.showModel, "change", this.handleShowModelChange);
		}