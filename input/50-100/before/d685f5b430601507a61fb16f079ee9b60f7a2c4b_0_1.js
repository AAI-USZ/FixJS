function reset () {
          this._state = {
            keys: Object.keys(dict),
            bucketIndex: 0,
            valueIndex: -1
          };
        }