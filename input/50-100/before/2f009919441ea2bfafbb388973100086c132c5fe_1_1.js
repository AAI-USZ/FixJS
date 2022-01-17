function(passageId) {
			this.version(passageId, this.version(passageId), false);
			this._storedReference(passageId, this._storedReference(passageId), false);
			
			//we restore the menu options manually:
			this._restoreMenuOptions(passageId, this.options(passageId));
			this._restoreInterlinearVersions(passageId, this.interlinearVersions(passageId));
			this._restorePassageSync();
			this._fireStateChanged(passageId);
		}