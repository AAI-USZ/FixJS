function setSlot(obj, index, value) {
        flushStack();
        push(call(id("setSlot"), [obj, constant(index), value]));
      }