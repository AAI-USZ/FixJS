function(e)
    {
    domiwyg.find();
    if (elem('upload_form'))
      {
      addSubmitEvent(elem('upload_form'), k.uploadFile);
      }
    }