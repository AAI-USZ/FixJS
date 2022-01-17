function (parentDomain) {
        // If no parent domain is passed in, get the current system domain.
        var parent;
        if (!parentDomain) {
          parent = Runtime.stack.top().domain.system;
        } else {
          parent = parentDomain.d;
        }

        glue(new Domain(parent), this);
      }