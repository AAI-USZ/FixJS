function (event) {
            var name = event.property;
            if (CSSLint.Util.indexOf(applyTo, name.text) > -1) {
            
                // e.g., -moz-transform is okay to be alone in @-moz-keyframes
                if (!inKeyFrame || typeof inKeyFrame != "string" || 
                        name.text.indexOf("-" + inKeyFrame + "-") !== 0) {
                    properties.push(name);
                }
            }
        }