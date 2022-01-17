function () {
        var missed_period = (self.form.missed_period === 'yes'),
            pregnancy_confirmation = (self.form.pregnancy_confirmation === 'yes'),
            using_contraception = (self.form.using_contraception === 'yes'),
            anc_group_present = !!(self.form.anc_group);

        var anc = {};
        anc.pregnancy_status = false;
        anc.is_anc_visit = false;
        anc.missed_period = missed_period;
        anc.pregnancy_confirmation = pregnancy_confirmation;
        anc.using_contraception = using_contraception;

        if (anc_group_present) {
            anc.is_anc_visit = true;

            var anc_info = self.form.anc_group;

            anc.pregnancy_status = (anc_info.pregnancy_status === 'yes');

            anc.pregnancy_registration = (anc_info.pregnancy_registration === 'yes');
            anc.pregnancy_registration_place = anc_info.pregnancy_registration_place;
            anc.pregnancy_registration_date = anc_info.pregnancy_registration_date;
            anc.lmp = self.form.lmp;
            anc.anc_visit_count_to_date = anc_info.anc_visit_count_to_date;
            anc.most_recent_anc_visit_bp = (anc_info.most_recent_anc_visit_bp === 'yes');
            anc.most_recent_anc_visit_weight = (anc_info.most_recent_anc_visit_weight === 'yes');
            anc.most_recent_anc_visit_abdomen = (anc_info.most_recent_anc_visit_abdomen === 'yes');
            anc.anc_hemoglobin = (anc_info.anc_hemoglobin === 'yes');
            anc.hemoglobin_value = anc_info.hemoglobin_value;
            anc.tetanus_which_ones = anc_info.tetanus_which_ones;
            anc.how_many_ifa_total = anc_info.how_many_ifa_total;
            anc.injection_syrup_received = (anc_info.injection_syrup_received === 'yes');
            anc.anc_headache = (anc_info.anc_headache === 'yes');
            anc.anc_blurred_vision = (anc_info.anc_blurred_vision === 'yes');
            anc.anc_edema = (anc_info.anc_edema === 'yes');
            anc.anc_no_fetal_mvmt = (anc_info.anc_no_fetal_mvmt === 'yes');
            anc.anc_bleeding = (anc_info.anc_bleeding === 'yes');
            anc.delivery_place_determined = anc_info.delivery_place_determined;
        }
        if (missed_period || pregnancy_confirmation || using_contraception || anc_group_present)
            self.data.antenatal = anc;
    }