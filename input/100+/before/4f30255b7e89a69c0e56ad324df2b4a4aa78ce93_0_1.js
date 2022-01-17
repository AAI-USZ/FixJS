function solve (model, locations, categories) {  

  // If we've visited every category, we're done.
  if (categories.every(function (item) { return model.categories[item]; })) 
    return [model];

  locations = clone(locations);

  var curr = model.locations[model.locations.length - 1];

  // Sort the remaining locations by their distance to the current node.
  if (!(curr.distances && curr.distances[loc2str(curr)]))
    distancify(curr, locations);

  locations.sort(function(a, b) { return a.distance - b.distance; });

  var results = [];
  var tries = 0;

  // Now, the top n locations of our array are the ones we will explore.
  while (locations.length > 0 && tries < iterations) {
    // Pop one location off.
    var next = locations.pop();

    // If we've already visited this category, continue
    if (model.categories[next.category]) continue;

    tries += 1;

    // Clone the model for recursion
    var nextModel = clone(model);

    // Add its distance to the total.
    nextModel.distance += next.distances[loc2str(curr)];

    // Mark its category as visited.
    nextModel.categories[next.category] = true;

    // Add this location into the list in the current model.
    nextModel.locations.push(next);

    // Add its result to the results array.
    results = results.concat(solve(nextModel, locations, categories));
  }

  // Sort results by distance.
  results.sort(function (a, b) { return a.distance - b.distance; });

  results = results.slice(0, 10);

  return results;
}