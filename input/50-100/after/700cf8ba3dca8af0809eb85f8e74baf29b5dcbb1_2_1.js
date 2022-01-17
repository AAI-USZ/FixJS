function writeAttr(view, value) {
        DEBUG_BEGIN;
        ASSERT(view instanceof jQuery, "expected jQuery object");
        if (typeof value !== "string" && value != null) {
          WARNING("be careful setting attribute " + attrName +
            " to a non-string value");
        }
        DEBUG_END;
        /* We intentionally use converting equality comparison (==) here */
        if (value == null) {
          view.removeAttr(attrName);
        } else {
          view.attr(attrName, value);
        }
      }