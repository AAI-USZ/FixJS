function() {
        var vit_model = this.model.clone();
        vit_model.set('base_vit', vit_model.get('base_vit')+1);
        var vit_ehp = vit_model.get('ehp') - this.model.get('ehp');
        
        var alternatives = {};
        
        _.each(this.model.getAllOptions(), function(optionInfo, optionName) {
            var selector = this.getCharacterSelector(optionName);
            var $fieldObj = $(selector,  this.el);

            this.toField($fieldObj, optionName, this.model.get(optionName));
            
            if (typeof(optionInfo['alternative']) != 'undefined') {
                if (typeof optionInfo['alternative'] == 'object') {
                    alternatives[optionName] = [optionInfo['alternative'], true];
                } else if (typeof optionInfo['alternative'] == 'boolean') {
                    alternatives[optionName] = [{/* this should contain stat changes */}, !this.model.get(optionName)];
                    alternatives[optionName][0][optionName] = !this.model.get(optionName);
                } else {
                    alternatives[optionName] = [{/* this should contain stat changes */}, true];
                    alternatives[optionName][0][optionName] = this.model.get(optionName) + optionInfo['alternative'];
                }
            }            
        }, this);
        
        _.each(['life', 'armor', 'armor_reduc', 'resist', 'resist_reduc', 'dodge'], function(buffed_stats_field) {
            var selector = this.getCharacterSelector(buffed_stats_field);
            var $fieldObj = $(selector,  this.el);

            this.toField($fieldObj, buffed_stats_field, this.model.get(buffed_stats_field));
        }, this);

        _.each(resulttypes, function(resulttype) {
            _.each(['', 'd', 'b', 'bnd'], function(alternative) {
                var ehp_field = 'ehp_'+resulttype+ (alternative ? '_' + alternative : '');
                
                var $fieldObj = $(this.getCharacterSelector(ehp_field),  this.el);
                this.toField($fieldObj, ehp_field, this.model.get(ehp_field));
            }, this);
        }, this);
        
        _.each(alternatives, function(alt, alt_field) {
            var alt_stats     = alt[0];
            var reltosource   = alt[1];
            var statweightsel = this.getStatWeightSelector(alt_field + "_alt_ehp");
            var charactersel  = this.getCharacterSelector(alt_field + "_alt_ehp");
            var alt_model     = this.model.clone();
            
            alt_model.set(alt_stats);

            var alt_ehp_field = 'ehp_base';

            _.each(alttypes, function(title, resulttype) {
                if($(charactersel, this.el).hasClass(resulttype + '_only')) {
                    alt_ehp_field = 'ehp_' + resulttype;
                }
            }, this);
            
            console.log(alt_ehp_field);
            
            var ehp     = this.model.get(alt_ehp_field);
            var alt_ehp = alt_model.get(alt_ehp_field);
            
            var ehp_change   = alt_ehp - ehp;
            var ehp_change_p = (ehp_change / (reltosource ? ehp : alt_ehp));
            var viteq        = ehp_change / vit_ehp;
            

            ehp_change   = (ehp_change   > 0) ? ("+" + this.prepareVal(ehp_change, '', 0))  : this.prepareVal(ehp_change, '', 0);
            ehp_change_p = (ehp_change_p > 0) ? ("+" + this.prepareVal(ehp_change_p, '%'))  : this.prepareVal(ehp_change_p, '%');
            viteq        = (viteq > 0)        ? ("+" + this.prepareVal(viteq, '', 2))       : this.prepareVal(viteq);
            
            var $fixedchange = this.options.settings.get('display_as') == Settings.DISPLAY_AS_EHP ? 
                        $('<em />').html(ehp_change + " EHP") :
                        $('<em />').html(viteq + " VITeq");
            
            $(charactersel, this.el).html("");
            $(charactersel, this.el).append(
                                        $fixedchange,
                                        $('<em />').html(ehp_change_p)
                                    );
            
            $('.statweight_ehp',        $(statweightsel, this.el)).html(ehp_change);
            $('.statweight_viteq',      $(statweightsel, this.el)).html(viteq);
            $('.statweight_percentage', $(statweightsel, this.el)).html(ehp_change_p);

            
        }, this);
    }