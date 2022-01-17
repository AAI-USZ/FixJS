function(resulttype) {
            var modifier       = modifiers[resulttype];
            var reduced_hit    = expected_hit * modifier; 
            var block_modifier = (reduced_hit * (1 - block_perc) + block_perc * (reduced_hit - Math.min(reduced_hit, block_amt))) / expected_hit;
            
            var ehp     = this.get('life') / modifier;
            var ehp_d   = this.get('life') / modifier / dodgemodifier;
            var ehp_b   = this.get('life') / block_modifier;
            var ehp_bnd = this.get('life') / block_modifier / dodgemodifier;
            
            this.set('ehp_'+resulttype,        ehp);
            this.set('ehp_'+resulttype+'_d',   ehp_d);
            this.set('ehp_'+resulttype+'_b',   ehp_b);
            this.set('ehp_'+resulttype+'_bnd', ehp_bnd);
        }