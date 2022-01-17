function (event) {
            var name = event.property;
            if (CSSLint.Util.indexOf(applyTo, name.text) > -1) {
                properties.push(name);
            }
        }