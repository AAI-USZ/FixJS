function(response) {
    LocalStorage.set('currentUpload', {
      uuid: response.data.uuid,
      input_file: file.name
    });

    API.upload('production/{uuid}/upload'.substitute(response.data), file).on({
      success: function() {
        LocalStorage.erase('currentUpload');
      }
    });

    History.push('/production/edit/{uuid}'.substitute(response.data));
  }