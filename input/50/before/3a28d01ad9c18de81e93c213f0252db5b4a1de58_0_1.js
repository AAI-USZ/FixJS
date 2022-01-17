function checkHttpProxyUrl(value, formValues) {
            if (formValues.source1 === "http_proxy" && value.length === 0) { return err; }
          }