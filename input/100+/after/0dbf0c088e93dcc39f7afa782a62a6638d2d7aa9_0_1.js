function (conf, doc, cb, msg) {
                msg.pub("start", "w3c/style");
                if (!conf.specStatus) msg.pub("error", "Configuration 'specStatus' is not set, required for w3c/style");
                var statStyle = conf.specStatus;
                if (statStyle === "FPWD"    || 
                    statStyle === "LC"      || 
                    statStyle === "WD-NOTE" || 
                    statStyle === "LC-NOTE" || 
                    statStyle === "FPWD-NOTE") statStyle = "WD";
                if (statStyle === "finding" || statStyle === "draft-finding") statStyle = "base";
                var css;
                if (statStyle === "unofficial") {
                    css = "http://www.w3.org/StyleSheets/TR/w3c-unofficial";
                }
                else if (statStyle === "base") {
                    css = "http://www.w3.org/StyleSheets/TR/base";
                }
                else if (statStyle === "CG-DRAFT" || statStyle === "CG-FINAL" || 
                         statStyle === "BG-DRAFT" || statStyle === "BG-FINAL") {
                    // note: normally, the ".css" is not used in W3C, but here specifically it clashes
                    // with a PNG of the same base name. CONNEG must die.
                    css = "http://www.w3.org/community/src/css/spec/" + statStyle.toLowerCase() + ".css";
                }
                else {
                    css = "http://www.w3.org/StyleSheets/TR/W3C-" + statStyle;
                }
                utils.linkCSS(doc, css);
                msg.pub("end", "w3c/style");
                cb();
            }