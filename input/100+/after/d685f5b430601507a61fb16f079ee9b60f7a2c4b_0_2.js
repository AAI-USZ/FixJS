function GetEnumerator () {
      var dict = this._dict;
      var tKvp = System.Collections.Generic.KeyValuePair$b2.Of(this.TKey, this.TValue);
      var tKey = this.TKey, tValue = this.TValue;

      return new JSIL.AbstractEnumerator(
        function getNext (result) {
          var keys = this._state.keys;
          var valueIndex = ++(this._state.valueIndex);
          var bucketIndex = this._state.bucketIndex;

          while ((bucketIndex >= 0) && (bucketIndex < keys.length)) {
            var bucketKey = keys[this._state.bucketIndex];
            var bucket = dict[bucketKey];

            if ((valueIndex >= 0) && (valueIndex < bucket.length)) {
              var current = this._state.current;
              current.key = bucket[valueIndex][0];
              current.value = bucket[valueIndex][1];
              result.value = current;
              return true;
            } else {
              bucketIndex = ++(this._state.bucketIndex);
              valueIndex = 0;
            }
          }

          return false;
        },
        function reset () {
          this._state = {
            current: new tKvp(JSIL.DefaultValue(tKey), JSIL.DefaultValue(tValue)),
            keys: Object.keys(dict),
            bucketIndex: 0,
            valueIndex: -1
          };
        },
        function dispose () {
          this._state = null;
        }
      );
    }