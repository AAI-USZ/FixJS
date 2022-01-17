function(currentNode) {
      var component, result;
      if (uriComponents.length <= 0) {
        return new RoutePath({
          node: currentNode,
          boundValues: boundValues
        });
      }
      component = uriComponents.shift();
      if (currentNode.childLiterals[component] != null) {
        result = recur(currentNode.childLiterals[component]);
        if (result != null) return result;
      }
      if (currentNode.childVariable != null) {
        boundValues.push(component);
        result = recur(currentNode.childVariable);
        if (result != null) return result;
        boundValues.pop();
      }
      return null;
    }