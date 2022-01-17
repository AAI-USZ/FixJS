function(passageId) {
		    this._restoreVersion(passageId);
		    this._restoreReference(passageId);
			
			//we restore the menu options manually:
			this._restoreMenuOptions(passageId, this.options(passageId));
			this._restoreInterlinearVersions(passageId, this.interlinearVersions(passageId));
			this._restorePassageSync();
			this._fireStateChanged(passageId);
		}