function parseBinding(node) {
    consume(); // consume '@'
    var binding = [];

    while (hasNext()) {
      if (validChar(peek())) {
        binding.push(next());
      } else {
        break;
      }
    }

    binding = binding.join('');

    if (binding.length > 0) {
      node.binding = binding;
    } else {
      throw "No binding name given at " + index + " for " + node.type;
    }
  }