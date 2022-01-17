function(itemslot) {
        itemslot = itemslot || this.activeitemslot;
        
        var vit_model = this.model.clone();
        vit_model.set('base_vit', vit_model.get('base_vit')+1);
        var vit_ehp = vit_model.get('ehp_base') - this.model.get('ehp_base');
        
        var curItem = this.model.getItemForSlot(itemslot, this.model.gearbag);
        var newItem = this.model.getItemForSlot(itemslot, this.model.new_gearbag);
        
        var compareModel = this.model.clone();

        _.each(curItem.getAllOptions(), function(optionInfo, optionName) {
            compareModel.set(optionName, compareModel.get(optionName) - curItem.get(optionName));
        });
        
        _.each(newItem.getAllOptions(), function(optionInfo, optionName) {
            compareModel.set(optionName, compareModel.get(optionName) + newItem.get(optionName));
        });
        
        compareModel.simulate();

        _.each(resulttypes, function(resulttype) {
            _.each(['', 'd', 'b', 'bnd'], function(alternative) {
                var ehp_field   = 'ehp_'+resulttype+ (alternative ? '_' + alternative : ''),
                    viteq_field = 'viteq_'+resulttype+ (alternative ? '_' + alternative : ''),
                    $fieldObj   = null;
                
                var viteq = this.model.get(ehp_field) / vit_ehp;
                
                // set the EHP field
                $fieldObj = $(this.getCharacterSelector(ehp_field),  this.el);
                this.toField($fieldObj, ehp_field, this.model.get(ehp_field));
                
                // set the VITeq field
                $fieldObj = $(this.getCharacterSelector(viteq_field),  this.el);
                this.toField($fieldObj, viteq_field, viteq);
            }, this);
        }, this);

        _.each(resulttypes, function(resulttype) {
            _.each(['', 'd', 'b', 'bnd'], function(alternative) {
                var ehp_field      = 'ehp_'+resulttype+ (alternative ? '_' + alternative : ''),
                    viteq_field    = 'viteq_'+resulttype+ (alternative ? '_' + alternative : ''),
                    ehp_selector   = this.getItemCompareSelector(ehp_field),
                    viteq_selector = this.getItemCompareSelector(viteq_field);
            
            var ehp     = this.model.get(ehp_field);
            var alt_ehp = compareModel.get(ehp_field);
            
            var ehp_change   = alt_ehp - ehp;
            var ehp_change_p = (ehp_change / ehp);
            var viteq        = ehp_change / vit_ehp;;

            ehp_change   = (ehp_change   > 0) ? ("+" + this.prepareVal(ehp_change, '', 0))  : this.prepareVal(ehp_change, '', 0);
            ehp_change_p = (ehp_change_p > 0) ? ("+" + this.prepareVal(ehp_change_p, '%'))  : this.prepareVal(ehp_change_p, '%');
            viteq        = (viteq > 0)        ? ("+" + this.prepareVal(viteq, '', 2))       : this.prepareVal(viteq);

            $(ehp_selector, this.el).val(ehp_change);
            $(ehp_selector + '.percentage', this.el).val(ehp_change_p);
            
            $(viteq_selector, this.el).val(viteq);
            $(viteq_selector + '.percentage', this.el).val(ehp_change_p);
            }, this);
        }, this);
    }