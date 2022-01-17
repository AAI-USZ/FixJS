function () {
      $('#saveValueButton').html("Save");
      $('#saveValueButton').removeAttr("disabled");
      refreshTree();
      $('#addListValueModal').modal('hide');
      $('#body').html('');
    }