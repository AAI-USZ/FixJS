function define(obj, key, desc){

      if ('value' in desc) {

        desc.value = unwrap(desc.value);

      } else {

        if (desc.get) desc.get = unwrap(desc.get);

        if (desc.set) desc.set = unwrap(desc.set);

      }

      Object.defineProperty(obj, key, desc);

      return TRUE;

    }