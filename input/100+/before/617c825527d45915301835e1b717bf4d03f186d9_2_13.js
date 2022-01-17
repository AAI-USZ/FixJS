function(options) {
        var parent = this.parent = def.get(options, 'parent') || null;
        if(parent) {
            this.root = parent.root;
            this.dataEngine =
            this.data = def.get(options, 'data') ||
                        def.fail.argumentRequired('options.data');
            
            this.left = options.left;
            this.top  = options.top;
            this._visualRoles = parent._visualRoles;
            this._measureVisualRoles = parent._measureVisualRoles;

            if(parent._serRole) {
                this._serRole = parent._serRole;
            }

            if(parent._dataPartRole) {
                this._dataPartRole = parent._dataPartRole;
            }
            
        } else {
            this.root = this;
            
            this._visualRoles = {};
            this._measureVisualRoles = [];
        }

        this.options = pvc.mergeDefaults({}, pvc.BaseChart.defaultOptions, options);
    }