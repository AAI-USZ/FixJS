function (anc) {
        self.calc.missed_period += anc.missed_period ? 1 : 0;
        self.calc.confirmed_preg += anc.pregnancy_confirmation ? 1 : 0;
        self.calc.using_contraception += anc.using_contraception ? 1 : 0;

        self.calc.registered_preg += anc.pregnancy_registration ? 1 : 0;
        self.calc.reg_place.govt += (anc.pregnancy_registration_place === 'government') ? 1 : 0;
        self.calc.reg_place.priv += (anc.pregnancy_registration_place === 'private') ? 1 : 0;

        if (anc.pregnancy_registration &&
            anc.pregnancy_registration_date &&
            anc.lmp) {
            var lmpDate = new Date(anc.lmp),
                pregRegDate = new Date(anc.pregnancy_registration_date);
            self.calc.early_registration += (Math.abs(pregRegDate.getTime() - lmpDate.getTime()) <= 84*24*60*60*1000) ? 1 : 0;
        }

        self.calc.anc_examination += (anc.is_anc_visit) ? 1 : 0;

        self.calc.stats.bp += anc.most_recent_anc_visit_bp ? 1 : 0;
        self.calc.stats.weight += anc.most_recent_anc_visit_weight ? 1 : 0;
        self.calc.stats.abdominal_exam += anc.most_recent_anc_visit_abdomen ? 1 : 0;
        self.calc.stats.hb_exam += anc.anc_hemoglobin ? 1 : 0;

        self.calc.hb.low += (anc.hemoglobin_value < 7) ? 1 : 0;
        self.calc.hb.avg += (7 <= anc.hemoglobin_value <= 10) ? 1 : 0;
        self.calc.hb.high += (anc.hemoglobin_value > 10) ? 1 : 0;

        self.calc.tt_booster += (anc.tetanus_which_ones === 'tt2' || anc.tetanus_which_ones === 'booster') ? 1 : 0;
        self.calc.ifa_tabs += (anc.how_many_ifa_total > 100) ? 1 : 0;
        self.calc.injection_syrup += (anc.injection_syrup_received) ? 1 : 0;

        self.calc.danger_signs.headache += (anc.anc_headache) ? 1 : 0;
        self.calc.danger_signs.blurred_vision += (anc.anc_blurred_vision) ? 1 : 0;
        self.calc.danger_signs.edema += (anc.anc_edema) ? 1 : 0;
        self.calc.danger_signs.fetal_mvmt += (anc.anc_no_fetal_mvmt) ? 1 : 0;
        self.calc.danger_signs.bleeding += (anc.anc_bleeding) ? 1 : 0;

        self.calc.delivery_place.govt += (anc.delivery_place_determined === ' government_hospital') ? 1 : 0;
        self.calc.delivery_place.priv += (anc.delivery_place_determined === 'private_hospital') ? 1 : 0;
    }