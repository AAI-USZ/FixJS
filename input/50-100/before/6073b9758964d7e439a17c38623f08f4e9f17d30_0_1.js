function (v) {
              v.fixable && (v.fix = fixError(copyResults(v, config), code));
            }