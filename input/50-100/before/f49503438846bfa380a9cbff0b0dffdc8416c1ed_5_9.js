function (parentDomain) {
        // If no parent domain is passed in, get the current system domain.
        var parent;
        if (!parentDomain) {
          parent = Runtime.stack.top().domain;
          while (parent.base) {
            parent = parent.base;
          }
        } else {
          parent = parentDomain.d;
        }

        glue(new Domain(parent), this);
      }