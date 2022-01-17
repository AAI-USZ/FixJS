function (item, i) {
    if (item.path.indexOf(lastPath) !== 0) {
      lastPath = item.path + '.';
      minimal.push(item);
      top = item;
    } else {
      if (!(item.value && top.value)) return;

      // special case for top level MongooseArrays
      if (top.value._path && top.value.doAtomics) {
        // and the item is not a MongooseArray
        if (!(item.value._path && item.value.doAtomics)) {
          // theres a sub path of top being explicitly set.
          // the only way to honor all of their modifications
          // is through a $set of entire array.
          // change top to a $set op
          top.value._atomics = {};
          top.value._atomics.$set = top.value;
        }
      }
    }
  }