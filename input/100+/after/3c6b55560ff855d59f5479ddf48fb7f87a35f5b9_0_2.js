function(response)
    {
    var info = '', content = '', 
      btn = self.form_btn;

    // Remove any form errors
    Kwf.removeFormErrors();

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

    // If no HTML was sent, check if there are any messages
    if (content === '')
      {
      // Add error and info messages to content <div>
      if (info !== '')
        {
        elem('content').insertBefore(toDOMnode(info), elem('content').firstChild);
        }

      // If there are form messages, add them to page and do NOT hide Boxing
      if (response.page.form_errors)
        {
        Kwf.handleFormErrors(response.page);
        }
      // If no content or messages were sent, hide the Boxing window
      else
        {
        Boxing.hide();
        }
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