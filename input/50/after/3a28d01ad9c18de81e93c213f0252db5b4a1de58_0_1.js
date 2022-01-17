function checkHttpProxyUrl(value, formValues) {
            if (formValues["source" + number] === "http_proxy" && value.length === 0) { return err; }
          }