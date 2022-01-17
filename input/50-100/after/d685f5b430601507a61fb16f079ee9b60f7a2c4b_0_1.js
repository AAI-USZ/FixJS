function reset () {
          this._state = {
            current: new tKvp(JSIL.DefaultValue(tKey), JSIL.DefaultValue(tValue)),
            keys: Object.keys(dict),
            bucketIndex: 0,
            valueIndex: -1
          };
        }