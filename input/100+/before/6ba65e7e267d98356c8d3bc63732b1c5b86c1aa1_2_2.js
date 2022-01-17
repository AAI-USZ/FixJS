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
        size: { title: "Size", type: 'Select', options: this.getSizeOptions() },
        graph_type: { title: "Graph Type", type: "Select", options: this.getGraphTypeOptions() },
        source: { title: "Source", type: 'Select', options: this.getSources() },
        http_proxy_url: {
          title: "Proxy URL",
          type: "Text",
          validators: [ function checkHttpProxyUrl(value, formValues) {
            if (formValues.source === "http_proxy" && value.length === 0) { return err; }
          }]
        },
        targets: { title: "Targets", type: 'Text', validators: ["required"] }
      };
    }