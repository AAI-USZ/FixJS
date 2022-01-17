function getBestRates() {
    $.getJSON(ts_ext_path + "processor.php", { axAction: "bestFittingRates", axValue: 0,
        project_id: $("#add_edit_zef_pct_ID").val(), event_id: $("#add_edit_zef_evt_ID").val()},
        function(data){
            if (data.hourlyRate == false) {
            	//TODO: why does Kimai do this? If we already set a rate
            	// we might want to keep it, not just reset it to empty..?
//              $("#ts_ext_form_add_edit_record #rate").val('');
              } else {
              $("#ts_ext_form_add_edit_record #rate").val(data.hourlyRate);
              }
            if (data.fixedRate == false) {
              $("#ts_ext_form_add_edit_record #fixed_rate").val('');
            } else {
              $("#ts_ext_form_add_edit_record #fixed_rate").val(data.fixedRate);
            }
        }
    );
}