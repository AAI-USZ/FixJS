function checkTargets(value, formValues) {
            if ((formValues.source === "demo" || formValues.source === "graphite") && value.length === 0) { return err; }
          }