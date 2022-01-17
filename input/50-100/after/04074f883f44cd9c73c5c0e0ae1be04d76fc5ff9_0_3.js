function(ibus, result) {
        let enginesList = this._ibus.list_engines_async_finish(result);
        if (enginesList) {
            for (let i = 0; i < enginesList.length; ++i) {
                let name = enginesList[i].get_name();
                this._engines[name] = enginesList[i];
            }
        } else {
            this._clear();
            return;
        }

        this._updateReadiness();
    }