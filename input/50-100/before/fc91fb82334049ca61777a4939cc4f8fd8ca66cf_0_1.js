function define(obj, key, desc){

      if ('value' in desc) {

        desc.value = unwrap(desc.value);

      } else {

        if ('get' in desc) desc.get = unwrap(desc.get);

        if ('set' in desc) desc.set = unwrap(desc.set);

      }

      Object.defineProperty(obj, key, desc);

      return TRUE;

    }