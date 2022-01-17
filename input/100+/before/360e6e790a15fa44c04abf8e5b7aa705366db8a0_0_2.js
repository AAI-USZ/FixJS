function(event) {
        let [stageX, stageY] = event.get_coords();
        let target = global.stage.get_actor_at_pos(Clutter.PickMode.ALL,
                                                   stageX,
                                                   stageY);

        if (target != this._pointerTarget)
            this._target = target;
        this._pointerTarget = target;

        let position = '[inspect x: ' + stageX + ' y: ' + stageY + ']';
        this._displayText.text = '';
        this._displayText.text = position + ' ' + this._target;

        if (this._borderPaintTarget != this._target) {
            if (this._borderPaintTarget != null)
                this._borderPaintTarget.remove_effect(this._redBorderEffect);
            this._borderPaintTarget = this._target;
            if (this._borderPaintTarget != null)
                this._borderPaintTarget.add_effect(this._redBorderEffect);
        }
    }