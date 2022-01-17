function adapt(o) {
    ["subscribers", "subscribe", "publish"].forEach(function (f) {
      if (o[f] !== undefined) {
        ERROR("new publisher already has property: " + f);
      }
    });

    o.subscribers = {};
    o.subscribe = subscribe;
    o.publish = publish;
  }