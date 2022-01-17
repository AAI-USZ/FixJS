function (array, arrayindex) {
      if (arrayindex != 0) {
          throw new Error("List<T>.CopyTo not supported for non-zero indexes");
      }
      
      JSIL.Array.ShallowCopy(array, this._items);
    }