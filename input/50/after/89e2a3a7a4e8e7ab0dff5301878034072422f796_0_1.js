function (object) {
        return object.persistence && persistencePool.getObjectName(object) === null;
      }