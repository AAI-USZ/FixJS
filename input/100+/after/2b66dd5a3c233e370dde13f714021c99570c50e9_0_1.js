function(currentNode, uriComponents) {
      var component, result;
      if (uriComponents.length <= 0) {
        return new RoutePath({
          node: currentNode,
          boundValues: boundValues
        });
      }
      component = uriComponents[0];
      if (currentNode.childLiterals[component] != null) {
        result = recur(currentNode.childLiterals[component], uriComponents.slice(1));
        if (result != null) return result;
      }
      if (currentNode.childVariable != null) {
        boundValues.push(component);
        result = recur(currentNode.childVariable, uriComponents.slice(1));
        if (result != null) return result;
        boundValues.pop();
      }
      return null;
    }