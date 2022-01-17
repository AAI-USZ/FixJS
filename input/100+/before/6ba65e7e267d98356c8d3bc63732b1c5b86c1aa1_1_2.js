function() {
      var err = { type: 'required', message: 'Required' };
      return {
        name: { title: "Text", validators: ["required"] },
        update_interval:  {
          title: 'Update Interval',
          type: 'Select',
          options: this.getUpdateIntervalOptions()
        },
        range: {
          title: 'Period',
          type: 'Select',
          options: this.getPeriodOptions()
        },
        source1: { title: "Source 1", type: 'Select', options: this.getSources() },
        http_proxy_url1: {
          title: "Proxy URL 1",
          type: "Text",
          validators: [ function checkHttpProxyUrl(value, formValues) {
            if (formValues.source1 === "http_proxy" && value.length === 0) { return err; }
          }]
        },
        targets1: { title: "Targets 1", type: 'Text', validators: ["required"] },
        aggregate_function1: { title: "Aggregate Function 1", type: 'Select', options: this.getAggregateOptions() },

        source2: { title: "Source 2", type: 'Select', options: this.getSources() },
        http_proxy_url2: {
          title: "Proxy URL 2",
          type: "Text",
          validators: [ function checkHttpProxyUrl(value, formValues) {
            if (formValues.source2 === "http_proxy" && value.length === 0) { return err; }
          }]
        },
        targets2: { title: "Targets 2", type: 'Text' },
        aggregate_function2: { title: "Aggregate Function 2", type: 'Select', options: this.getAggregateOptions() }
      };
    }