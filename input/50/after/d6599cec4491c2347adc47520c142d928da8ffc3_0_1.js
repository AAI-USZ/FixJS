function setSlot(obj, index, value) {
        flushStack();
        emit(call(id("setSlot"), [obj, constant(index), value]));
      }