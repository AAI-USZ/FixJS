function(combo, e, opt) {
          //console.log(e.keyCode);
          if(e.keyCode === 13){
            var filter_text = combo.getValue();
            var store = this.getTest_casesStore();
            var proxy = store.getProxy();
            if (filter_text != ""){
              proxy.extraParams = { filter_chaining: 'OR', filter_type: 'like' };
              store.filter([
                { property: 'feature_name', value: filter_text},
                { property: 'test_cases.name', value: filter_text},
                { property: 'warden_projects.name', value: filter_text}
              ]);
            }
            store.filters.clear();
          }
        }