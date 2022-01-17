function (fullname, namespaceuri, sysid, line) {
        if (sysid === undef) {
          return new XMLElement(fullname, namespaceuri);
        }
        return new XMLElement(fullname, namespaceuri, sysid, line);
      }