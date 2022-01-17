function cb(module) {
      module && (module.status = STATUS.LOADED)
      --remain === 0 && callback()
    }