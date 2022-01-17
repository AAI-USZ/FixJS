function bless(proto) {
      proto.plugin = plugin;

      extend(proto, plugins);

      return proto;
    }