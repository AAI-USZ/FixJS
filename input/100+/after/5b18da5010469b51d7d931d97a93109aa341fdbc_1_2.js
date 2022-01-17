function (inc) {
        self.calc.outcome.live_birth += (inc.pregnancy_outcome === 'live_birth') ? 1 : 0;
        self.calc.outcome.still_birth += (inc.pregnancy_outcome === 'still_birth') ? 1 : 0;
        self.calc.outcome.abortion += (inc.pregnancy_outcome === 'abortion') ? 1 : 0;

        self.calc.place.govt += (inc.birth_place === 'government_hospital') ? 1 : 0;
        self.calc.place.priv += (inc.birth_place === 'private_hospital') ? 1 : 0;
        self.calc.place.home += (inc.birth_place === 'home') ? 1 : 0;

        self.calc.type.normal += (inc.delivery_type === 'normal') ? 1 : 0;
        self.calc.type.lscs += (inc.delivery_type === 'instrumental') ? 1 : 0;
        self.calc.type.forceps += (inc.delivery_type === 'ceasarean') ? 1 : 0;

        self.calc.sex.male += (inc.child_sex === 'male') ? 1 : 0;
        self.calc.sex.female += (inc.child_sex === 'female') ? 1 : 0;

        self.calc.weight.low += (inc.birth_weight < 2) ? 1 : 0;
        self.calc.weight.avg += (2 <= inc.birth_weight && inc.birth_weight <= 2.5) ? 1 : 0;
        self.calc.weight.high += (inc.birth_weight > 2.5) ? 1 : 0;
    }