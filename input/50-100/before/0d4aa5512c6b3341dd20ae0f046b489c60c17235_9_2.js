function (newmsg) {
      if (newmsg.index > lastidx) {
        lastidx = newmsg.index;
        model.set(newmsg.msg);
      }
    }