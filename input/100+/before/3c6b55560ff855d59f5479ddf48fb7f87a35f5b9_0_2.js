function(response)
    {
    var info = '', content = '', 
      btn = self.form_btn;

    // Store the response object in this object so any event listeners can access it
    self.response = response;
    // Fire the afterload event
    self.dispatchEvent('afterload', caller);
    // Retrieve the response object again (it may have been changed by an event listener)
    response = self.response;

    // If the response contains JSON: look for error and info messages
    if (response.content_type === 'application/json')
      {
      info = Kwf.infoHandler(response.page);
      if (response.page.content)
        {
        // Get the HTML from content property
        content = info + response.page.content;
        }
      }
    else
      {
      // Get the HTML from page property
      content = response.page;
      }

    // If no HTML was sent, hide the Boxing window and add error and info messages to content <div>
    if (content === '')
      {
      if (info !== '')
        {
        elem('content').insertBefore(toDOMnode(info), elem('content').firstChild);
        }

      Boxing.hide();
      }
    else
      {
      Boxing.show(content, self.width, self.height);
      self.findForms();
      }

    self.dispatchEvent('ready', caller);
    caller = null;
    self.response = null;

    // Restore the form_btn
    if (btn)
      {
      btn.disabled = '';
      self.form_btn = null;
      }
    }