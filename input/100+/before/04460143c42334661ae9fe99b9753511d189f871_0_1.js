function(object, list) {
    var newtask;
    outputToConsole("Sending task...");
    newtask = list.querySelector(".empty");
    newtask.classList.add("processing");
    newtask.classList.remove("empty");
    newtask.innerHTML = object.task_text;
    addProcessingSpinner(newtask);
    clearActiveInput();
    updatePageTitle(true);
    $.ajax({
      url: "/todo/",
      type: "POST",
      data: object,
      success: function(data, textStatus, jqXHR) {
        var json;
        json = $.parseJSON(data);
        outputToConsole("task added");
        newtask.setAttribute("data-id", json.id);
        return removeProcessingSpinner(newtask);
      }
    });
    return true;
  }