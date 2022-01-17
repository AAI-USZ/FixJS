function (node) {
    var name = node.name()
    node._name = name
    //console.error(0, name, node)
    switch (name) {
      case 'text':
        // ignore; just '\n' whitespace
        break;
      case 'depends_on':
        Import(node.attr('path').value(), true)
        break;
      case 'class':
        node.name = node.attr('name').value()
        exports.classes[node.name] = node
        break;
      case 'string_constant':
        _global[node.attr('name').value()] = getValue(node)
        break;
      case 'enum':
        _global[node.attr('name').value()] = Number(getValue(node))
        break;
      case 'struct':
        // TODO: Remove the try/catch when all the Struct formats are supported
        //       Still need Array and Union support.
        try {
          _global[node.attr('name').value()] = struct.getStruct(getType(node))
        } catch (e) {
          //console.error('FAILED:\n', a)
          console.error(e.stack)
        }
        break;
      case 'field':
        break;
      case 'cftype':
        break;
      case 'constant':
        node.name = node.attr('name').value()
        defineConstant(node, fw)
        break;
      case 'function':
        node.name = node.attr('name').value()
        defineFunction(node, fw)
        break;
      case 'opaque':
        break;
      case 'informal_protocol':
        node.name = node.attr('name').value()
        exports.informal_protocols[node.name] = node
        break;
      case 'function_alias':
        break;
      default:
        throw new Error('unkown tag: '+ node.name)
        break;
    }
  }