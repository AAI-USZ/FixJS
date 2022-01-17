function(response) {
    API.upload('production/{uuid}/upload'.substitute(response.data), file);
    History.push('/production/edit/{uuid}'.substitute(response.data));
  }