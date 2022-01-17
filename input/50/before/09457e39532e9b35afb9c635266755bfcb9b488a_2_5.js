function(b) {
                 if (typeof b == "string" && /^go[A-Z]/.test(b)) return doHandleBinding(b);
               }