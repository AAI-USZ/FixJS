function writeAttr(view, value) {
        BEGIN_DEBUG;
        ASSERT(view instanceof jQuery, "expected jQuery object");
        if (typeof value !== "string") {
          WARNING("be careful setting attribute " + attrName +
            " to a non-string value");
        }
        END_DEBUG;
        view.attr(attrName, value);
      }