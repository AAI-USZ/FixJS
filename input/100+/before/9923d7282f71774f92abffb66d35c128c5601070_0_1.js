function graph(node, visited, options) {
  visited.push(node.id);
  var requirerPath = node.path;
  var requirerType = node.type;

  var requirements = requirerType === 'system' ? Stream.empty :
                                                 read(requirerPath);

  // Expand each requirement of the given module to a node containing
  // information about it's location & type.
  var requirementNodes = expand(function(requirement) {
    return search(requirement, requirerPath, requirerType, options);
  }, requirements);

  // This step add's `id` property with unique value identifying
  // module.
  var identified = idify(requirementNodes, options);
  var requirer = addRequirements(node, identified);
  var dependencies = stripRequirement(identified);
  // Filter out dependencies that have not being visited yet.
  var newDependencies = filter(function(dependency) {
    return visited.indexOf(dependency.id) < 0;
  }, dependencies);

  // Expand new dependencies to their sub graphs.
  var subGraph = expand(function(dependency) {
    return graph(dependency, visited, options);
  }, newDependencies);

  return append(requirer, subGraph);
}