function matchArray(m,a) {
    var result = {
      result: false,
      param: a
    },
    from = 0,
    rest = false,
    restBindingResult,
    index,
    matcher,
    item,
    matchResult,
    restOfArray = [],
    i;

    if (!isArray(a)) {
      return result;
    }

    /**
     * If there are more predicates than array items, this
     * can't match.
     */
    if (m.length > a.length) {
      return result;
    }

    /**
     * If there are no predicates at all, this matches.
     * Because we have already ensured that it is a valid array.
     */
    if(m.length === 0) {
      result.result = true;
      return result;
    }

    for(index=0;index<a.length;index++) {
      matcher = m[index];
      item = a[index];

      if(!matcher) {
        return result;
      }

      matchResult = matcher(item);
      if(!matchResult.result) {
        return result;
      }

      /**
       * If the rest of an array is matched, the predicate will
       * return an object that has a'rest' parameter. We can't
       * recognize the rest predicate by it's function name, because
       * it might be hidden behind a 'bind' quasi-predicate.
       */
      if(matchResult.rest) {
        restBindingResult = matchResult;
        from = index;
        rest = true;
        break;
      }
    }

    if(rest && restBindingResult.this_binding) {
      for(i = from; i < a.length; i++) {
        restOfArray.push(a[i]);
      }
      bindingContext[restBindingResult.this_binding] = restOfArray;
    }
    
    result.result = true;
    return result;
  }