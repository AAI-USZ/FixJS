function cb(module) {
      module && (module.status = STATUS.READY)
      --remain === 0 && callback()
    }