function () {
        this.off('change', this.simulate);
                
        // grab the base values and set them so we can start modifying that value
        this.set('str',    this.get('base_str')    + this.get('extra_str'));
        this.set('dex',    this.get('base_dex')    + this.get('extra_dex'));
        this.set('int',    this.get('base_int')    + this.get('extra_int'));
        this.set('vit',    this.get('base_vit'));
        
        this.set('armor',  this.get('base_armor')  + this.get('extra_armor')  + (this.get('extra_str')*1));
        this.set('resist', this.get('base_resist') + this.get('extra_resist') + (this.get('extra_int')*0.1));
        
        this.set('dodge',  this.get('base_dodge')  + this.getDodgeFromExtraDex());

        // modify the base values (static increases)
        this.set('armor',  this.modifyBaseArmor(this.get('armor')));
        this.set('resist', this.modifyBaseResist(this.get('resist')));

        // create and modify the armor modifier
        var armormodifier = 1;
        armormodifier = this.modifyArmorModifier(armormodifier);

        // create and modify the resist modifier
        var resistmodifier = 1;
        resistmodifier = this.modifyResistModifier(resistmodifier);

        // create and modify the dodge chance
        var dodgechance = 1;
        dodgechance *= (1 - (this.get('dodge') / 100));
        dodgechance = this.modifyDodgeChance(dodgechance);
        dodgechance = 1 - dodgechance;
        this.set('dodge', dodgechance);
                    
        var dodgemodifier = 1 - dodgechance;

        // apply the modifiers to the base value (with their static increases already applied) for armor and resist
        this.set('armor',  this.get('armor')  * armormodifier);
        this.set('resist', this.get('resist') * resistmodifier);

        // calculate the actual reduction for armor and resist
        this.set('armor_reduc',  this.get('armor') /  (50 * this.get('moblevel') + this.get('armor')));
        this.set('resist_reduc', this.get('resist') / (5  * this.get('moblevel') + this.get('resist')));

        // stack the modifiers
        var modifier = 1;
        modifier *= (1 - this.get('armor_reduc'));
        modifier *= (1 - this.get('resist_reduc'));

        // add more modifiers
        modifier = this.modifyReductionModifier(modifier);
        
        // create the special modifiers
        var modifiers = {
            'base':   modifier,
            'melee':  this.modifyReductionModifierMelee( modifier * (1 - (this.get('base_melee_reduc')  / 100))),
            'ranged': this.modifyReductionModifierRanged(modifier * (1 - (this.get('base_ranged_reduc') / 100))),
            'elite':  this.modifyReductionModifierMelee( modifier * (1 - (this.get('base_elite_reduc')  / 100))),
            'magic':  this.modifyReductionModifierMagic( modifier)
        };

        // calculate life based on vit/level
        var lifebylvl = this.get('level') - 25;
        lifebylvl = lifebylvl < 10 ? 10 : lifebylvl;

        this.set('life', (36 + (4 * this.get('level')) + (lifebylvl * this.get('vit'))));

        // modify the base life (static increases)
        this.set('life', this.modifyBaseLife(this.get('life')));

        // create and modify the armor modifier
        var lifemodifier = 1 + (this.get('extra_life') / 100);
        lifemodifier = this.modifyLifeModifier(lifemodifier);

        // apply the life modifier
        this.set('life', this.get('life') * lifemodifier);
     
        // average expected hit after damage reduction
        var block_perc   = this.get('block_chance') / 100;
        var block_amt    = this.get('block_value');
        var expected_hit = this.get('incoming_hit');
        
        _.each(resulttypes, function(resulttype) {
            var modifier       = modifiers[resulttype];
            var reduced_hit    = expected_hit > 0 ? expected_hit * modifier : 0;
            var block_modifier = expected_hit > 0 ? ((reduced_hit * (1 - block_perc) + block_perc * (reduced_hit - Math.min(reduced_hit, block_amt))) / expected_hit) : modifier;
            
            var ehp     = this.get('life') / modifier;
            var ehp_d   = this.get('life') / modifier / dodgemodifier;
            var ehp_b   = this.get('life') / block_modifier;
            var ehp_bnd = this.get('life') / block_modifier / dodgemodifier;
            
            this.set('ehp_'+resulttype,        ehp);
            this.set('ehp_'+resulttype+'_d',   ehp_d);
            this.set('ehp_'+resulttype+'_b',   ehp_b);
            this.set('ehp_'+resulttype+'_bnd', ehp_bnd);
        }, this);

        this.on('change', this.simulate);
    }