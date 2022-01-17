function sanitizeAttrs(tagName, attribs) {
        var n = attribs.length;
        var needsTargetAttrib =
            html4.ATTRIBS.hasOwnProperty(tagName + '::target');
        for (var i = 0; i < n; i += 2) {
          var attribName = attribs[+i];
          if ('autocomplete' === attribName) { continue; }
          if ('target' === attribName) { needsTargetAttrib = false; }
          var value = attribs[i + 1];
          var atype = null, attribKey;
          if ((attribKey = tagName + '::' + attribName,
               html4.ATTRIBS.hasOwnProperty(attribKey))
              || (attribKey = '*::' + attribName,
                  html4.ATTRIBS.hasOwnProperty(attribKey))) {
            atype = html4.ATTRIBS[attribKey];
            value = rewriteAttribute(tagName, attribName, atype, value);
          } else if (!/__$/.test(attribKey)) {
            attribName = attribs[+i] = cajaPrefix + attribs[+i];
          } else {
            value = null;
          }
          if (value !== null && value !== void 0) {
            attribs[i + 1] = value;
          } else {
            // Swap last attribute name/value pair in place, and reprocess here.
            // This could affect how user-agents deal with duplicate attributes.
            attribs[i + 1] = attribs[--n];
            attribs[+i] = attribs[--n];
            i -= 2;
          }
        }
        attribs.length = n;
        if (needsTargetAttrib) {
          attribs.push('target', optTargetAttributePresets.default);
        }
        if ('form' === tagName || 'input' === tagName) {
          attribs.push('autocomplete', 'off');
        }
        var policy = elementPolicies[tagName];
        if (policy && elementPolicies.hasOwnProperty(tagName)) {
          return policy(attribs);
        }
        return attribs;
      }