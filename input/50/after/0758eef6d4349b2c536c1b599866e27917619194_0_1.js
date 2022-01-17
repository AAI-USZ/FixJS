function writeAttr(view, value) {
        DEBUG_BEGIN;
        ASSERT(view instanceof jQuery, "expected jQuery object");
        if (typeof value !== "string") {
          WARNING("be careful setting attribute " + attrName +
            " to a non-string value");
        }
        DEBUG_END;
        view.attr(attrName, value);
      }