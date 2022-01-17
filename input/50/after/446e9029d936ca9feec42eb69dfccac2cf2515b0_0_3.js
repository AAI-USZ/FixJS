function bless(proto) {
      proto.share = share;

      extend(proto, plugins);

      return proto;
    }