function() {
    this.control({
      'test_case_viewer': {
        'itemdblclick': this.test_event,
        'render': this.load_test_case
      },
      'test_case_viewer button[action=run_test_cases]': {
        'click' : this.run_test_cases
      },
      'test_case_viewer combo[name=app_env]': {
        'afterrender': function(combo) { combo.setValue('prd') }
      },
      'test_case_folder_viewer': {
        'select': function(smodel, node, index) {
          //alert("selected");
        }
      },
      'test_case_viewer combo[name=search]': {
        'keyup': function(combo, e, opt) {
          console.log(e.keyCode);
          if(e.keyCode === 13){
            var filter_text = combo.getValue();
            var store = this.getTest_casesStore();
            store.filter([
              { property: 'feature_name', value: filter_text},
              { property: 'test_cases.name', value: filter_text},
              { property: 'warden_projects.name', value: filter_text}
            ]);
            store.filters.clear();
          }
        }
      }
    });

    console.log('Initialized Utest_case_run_info_grid_viewersers! This happens before the Application launch function is called');
  }