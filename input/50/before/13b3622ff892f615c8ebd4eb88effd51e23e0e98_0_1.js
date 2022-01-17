function()
    {
    var errors = document.getElementsByClassName('form-error');

    while (errors[0])
      {
      errors[0].parentNode.removeChild(errors[0]);
      }
    }