function(model) {
      var $beginsWith, $beginsWithValue, $endWithValue, $endsWith, $mod, $size, empty, match, matchAll, matchAny, modelId, modelValue, modelValueExists, query, queryGroup, selectorName, selectorValue, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
      matchAll = true;
      matchAny = false;
      empty = true;
      _ref = this.query;
      for (selectorName in _ref) {
        if (!__hasProp.call(_ref, selectorName)) continue;
        selectorValue = _ref[selectorName];
        match = false;
        empty = false;
        modelValue = model.get(selectorName);
        modelId = model.get('id');
        modelValueExists = typeof modelValue !== 'undefined';
        if (!modelValueExists) {
          modelValue = false;
        }
        if (selectorName === '$or' || selectorName === '$nor') {
          queryGroup = util.toArrayGroup(selectorValue);
          if (!queryGroup.length) {
            throw new Error("Query called with an empty " + selectorName + " statement");
          }
          for (_i = 0, _len = queryGroup.length; _i < _len; _i++) {
            query = queryGroup[_i];
            query = new Query(query);
            if (query.test(model)) {
              match = true;
              break;
            }
          }
          if (selectorName === '$nor') {
            match = !match;
          }
        } else if (selectorName === '$and' || selectorName === '$not') {
          queryGroup = util.toArrayGroup(selectorValue);
          if (!queryGroup.length) {
            throw new Error("Query called with an empty " + selectorName + " statement");
          }
          for (_j = 0, _len1 = queryGroup.length; _j < _len1; _j++) {
            query = queryGroup[_j];
            query = new Query(query);
            match = query.test(model);
            if (!match) {
              break;
            }
          }
          if (selectorName === '$not') {
            match = !match;
          }
        } else if (_.isString(selectorValue) || _.isNumber(selectorValue) || _.isBoolean(selectorValue)) {
          if (modelValueExists && modelValue === selectorValue) {
            match = true;
          }
        } else if (_.isArray(selectorValue)) {
          if (modelValueExists && (new Hash(modelValue)).isSame(selectorValue)) {
            match = true;
          }
        } else if (_.isDate(selectorValue)) {
          if (modelValueExists && modelValue.toString() === selectorValue.toString()) {
            match = true;
          }
        } else if (_.isRegExp(selectorValue)) {
          if (modelValueExists && selectorValue.test(modelValue)) {
            match = true;
          }
        } else if (_.isObject(selectorValue)) {
          $beginsWith = selectorValue.$beginsWith || selectorValue.$startsWith || null;
          if ($beginsWith && modelValueExists && _.isString(modelValue)) {
            if (!_.isArray($beginsWith)) {
              $beginsWith = [$beginsWith];
            }
            for (_k = 0, _len2 = $beginsWith.length; _k < _len2; _k++) {
              $beginsWithValue = $beginsWith[_k];
              if (modelValue.substr(0, $beginsWithValue.length) === $beginsWithValue) {
                match = true;
                break;
              }
            }
          }
          $endsWith = selectorValue.$endsWith || selectorValue.$finishesWith || null;
          if ($endsWith && modelValueExists && _.isString(modelValue)) {
            if (!_.isArray($endsWith)) {
              $endsWith = [$endsWith];
            }
            for (_l = 0, _len3 = $endsWith.length; _l < _len3; _l++) {
              $endWithValue = $endsWith[_l];
              if (modelValue.substr($endWithValue.length * -1) === $endWithValue) {
                match = true;
                break;
              }
            }
          }
          if (selectorValue.$all) {
            if (modelValueExists) {
              if ((new Hash(modelValue)).hasAll(selectorValue.$all)) {
                match = true;
              }
            }
          }
          if (selectorValue.$in) {
            if (modelValueExists) {
              if ((new Hash(modelValue)).hasIn(selectorValue.$in)) {
                match = true;
              } else if ((new Hash(selectorValue.$in)).hasIn(modelValue)) {
                match = true;
              }
            }
          }
          if (selectorValue.$has) {
            if (modelValueExists) {
              if ((new Hash(modelValue)).hasIn(selectorValue.$has)) {
                match = true;
              }
            }
          }
          if (selectorValue.$hasAll) {
            if (modelValueExists) {
              if ((new Hash(modelValue)).hasIn(selectorValue.$hasAll)) {
                match = true;
              }
            }
          }
          if (selectorValue.$nin) {
            if (modelValueExists) {
              if ((new Hash(modelValue)).hasIn(selectorValue.$nin) === false && (new Hash(selectorValue.$nin)).hasIn(selectorValue) === false) {
                match = true;
              }
            }
          }
          $size = selectorValue.$size || selectorValue.$length;
          if ($size) {
            if ((modelValue.length != null) && modelValue.length === $size) {
              match = true;
            }
          }
          if (selectorValue.$type) {
            if (typeof modelValue === selectorValue.$type) {
              match = true;
            }
          }
          if (selectorValue.$like) {
            if (_.isString(modelValue) && modelValue.toLowerCase().indexOf(selectorValue.$like.toLowerCase()) !== -1) {
              match = true;
            }
          }
          if (selectorValue.$likeSensitive) {
            if (_.isString(modelValue) && modelValue.indexOf(selectorValue.$likeSensitive) !== -1) {
              match = true;
            }
          }
          if (selectorValue.$exists) {
            if (selectorValue.$exists) {
              if (modelValueExists === true) {
                match = true;
              }
            } else {
              if (modelValueExists === false) {
                match = true;
              }
            }
          }
          if (selectorValue.$mod) {
            if (modelValueExists) {
              $mod = selectorValue.$mod;
              if (!_.isArray($mod)) {
                $mod = [$mod];
              }
              if ($mod.length === 1) {
                $mod.push(0);
              }
              if ((modelValue % $mod[0]) === $mod[1]) {
                match = true;
              }
            }
          }
          if (selectorValue.$eq) {
            if (modelValueExists && _.isEqual(modelValue, selectorValue.$eq)) {
              match = true;
            }
          }
          if (selectorValue.$ne) {
            if (modelValueExists && modelValue !== selectorValue.$ne) {
              match = true;
            }
          }
          if (selectorValue.$lt) {
            if (modelValueExists && modelValue < selectorValue.$lt) {
              match = true;
            }
          }
          if (selectorValue.$gt) {
            if (modelValueExists && modelValue > selectorValue.$gt) {
              match = true;
            }
          }
          if (selectorValue.$bt) {
            if (modelValueExists && selectorValue.$bt[0] < modelValue && modelValue < selectorValue.$bt[1]) {
              match = true;
            }
          }
          if (selectorValue.$lte) {
            if (modelValueExists && modelValue <= selectorValue.$lte) {
              match = true;
            }
          }
          if (selectorValue.$gte) {
            if (modelValueExists && modelValue >= selectorValue.$gte) {
              match = true;
            }
          }
          if (selectorValue.$bte) {
            if (modelValueExists && selectorValue.$bte[0] <= modelValue && modelValue <= selectorValue.$bte[1]) {
              match = true;
            }
          }
        }
        if (match) {
          matchAny = true;
        } else {
          matchAll = false;
        }
      }
      if (matchAll && !matchAny) {
        matchAll = false;
      }
      return matchAll;
    }