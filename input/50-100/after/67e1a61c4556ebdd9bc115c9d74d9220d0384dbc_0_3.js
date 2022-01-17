function parseBinding(node) {
    consume(); // consume '@'
    var binding = [], isFirst = true;

    while (hasNext()) {
      if (validChar(peek(), isFirst)) {
        binding.push(next());
      } else {
        break;
      }
      
      isFirst = false;
    }

    binding = binding.join('');

    if (binding.length > 0) {
      node.binding = binding;
    } else {
      throw "No binding name given at " + index + " for " + node.type;
    }
  }