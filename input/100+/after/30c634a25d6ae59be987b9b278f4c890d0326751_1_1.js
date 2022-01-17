function(alt, alt_field) {
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

            
        }