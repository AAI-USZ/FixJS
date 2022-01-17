function(e) {
      debugger
      var newInput = "<tr class='input-row'><td></td><td></td><td></td><td><input class='img-delete' type='image' src='/images/icons/delete.png'></td></tr>";
      $("#input_list tr:last").after(newInput);
      $("#input_list tr:last").after($("#add_new_input"));
      $("#command").val("");
      $target_type = $("#target_type");
      $target_type.removeAttr("disabled");
      $("#target_type").empty();
      $target_type.append($("<option value=''>id</option>"));
      $target_type.append($("<option value=''>name</option>"));
      $target_type.append($("<option value=''>cssSelector</option>"));
      $target_type.append($("<option value=''>linkText</option>"));
      $("#target_value").val("");
      $("#value").val("");
      this.changeSelectedInputRow($("tr.input-row").last());
      this.updateSelectedInputRow();
    }