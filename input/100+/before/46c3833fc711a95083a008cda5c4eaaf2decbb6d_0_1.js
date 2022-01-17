function calculateOutputCalibrationStats(type, id_prefix) {

  if ($('#' + id_prefix + '_q1').val() != '' && $('#' + id_prefix + '_q2').val() != '' && $('#' + id_prefix + '_q3').val() != '') {

    var qAvg = (parseFloat($('#' + id_prefix + '_q1').val()) + parseFloat($('#' + id_prefix + '_q2').val()) + parseFloat($('#' + id_prefix + '_q3').val())) / 3.0;

    $('#' + id_prefix + '_avg').val(qAvg);

    

    switch ($('#form_entry_form_values_electrometer').val()) {

      case 'SI CDX 2000B #1 (S/N J073443, Kelec 1.000)':

        var electrometer_adjustment = 0.1;

        var electrometer_electron_adjustment = 1;

        var k_elec = 1;

        break;

      case 'SI CDX 2000B #2 (S/N J073444, Kelec 1.000)':

        var electrometer_adjustment = 0.1;

        var electrometer_electron_adjustment = 1;

        var k_elec = 1;

        break;

      default:

      case 'Keithley Model 614 (S/N 42215, Kelec 0.995)':

        var electrometer_adjustment = 1;

        var electrometer_electron_adjustment = 0.1;

        var k_elec = 0.995;

        break;

    }

    switch ($('#form_entry_form_values_ionization_chamber').val()) {

      case 'Farmer (S/N 944, ND.SW(Gy/C) 5.18E+07)':

        var chamber_constant = 0.518;

        var M_c_choices = {"_6MeV": 20.5, "_9MeV": 20.8, "12MeV": 21.0, "16MeV": 21.6, "20MeV": 21.8};

        break;

      case 'Farmer (S/N 269, ND.SW(Gy/C) 5.32E+07)':

        var chamber_constant = 0.532;

        var M_c_choices = {"_6MeV": 20.0, "_9MeV": 20.3, "12MeV": 20.4, "16MeV": 21.0, "20MeV": 21.2};

        break;

    }

    switch (type) {

      case 'electron':

        var p_ion = 1.01;

        break;

      case 'photon':

        if (id_prefix.indexOf('18MV') < 0) {

          var p_ion = 1.001;

          var k_q = 0.991;

          var D_w_abs = 0.85;

        } else {

          var p_ion = 1.004;

          var k_q = 0.965;

          var D_w_abs = 0.9;

        }

        $('#' + id_prefix + '_Dw_abs').val(D_w_abs);

        break;

    }

    

    var M = qAvg * parseFloat($('#form_entry_form_values_tpcf').val()) * p_ion * k_elec;

    $('#' + id_prefix + '_M').val(roundNumber(M, 4));

    $('#' + id_prefix + '_M').trigger('change');

    if (type == 'photon') {

      var D_w = M * k_q * chamber_constant * electrometer_adjustment;

      var percentDiff = (D_w - D_w_abs) / D_w_abs * 100;

      $('#' + id_prefix + '_Dw').val(roundNumber(D_w, 4));

      $('#' + id_prefix + '_Dw').trigger('change');

    } else if (type == 'electron') {

      var M_c = M_c_choices[id_prefix.substr(-5)] * electrometer_electron_adjustment;

      var percentDiff = (M - M_c) / M_c * 100;

      $('#' + id_prefix + '_Mc').val(roundNumber(M_c, 4));

      $('#' + id_prefix + '_Mc').trigger('change');    

    }

    

    $('#' + id_prefix + '_diff').val(roundNumber(percentDiff, 4))

    if (id_prefix.indexOf('_adjusted') < 0) {

      // if we're in the non-adjustment form, then toggle the adjustment form's display status based on the percent diff calculated earlier.

      switch (type) {

        case 'electron':

          $('#electron_output_calibration_adjustment').toggle(Math.abs(percentDiff) > 2.0);

          break;

        default:

        case 'photon':

          $('#photon_output_calibration_adjustment').toggle(Math.abs(percentDiff) > 2.0);

          break;

      }

    }

  }

}