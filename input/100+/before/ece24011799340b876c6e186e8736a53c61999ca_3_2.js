function(file) {
  var data = {metadata: {title: 'Mobile App: New Production'}};

  var onCreateSuccess = function(response) {
    API.upload('production/{uuid}/upload'.substitute(response.data), file);
    History.push('/production/edit/{uuid}'.substitute(response.data));
  };

  // TODO(cpojer): use a new production instead of the same one
  var object = {uuid: 'hA68J6ZxFoYwjYZrAdEZpE'};
  onCreateSuccess.call(null, {data: object});
  return;

  API.call('productions', 'post', JSON.stringify(data)).on({
    success: onCreateSuccess
  });
}