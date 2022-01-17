function(response)
    {
    var info = '', content = '', 
      context = elem('content'), 
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

    // If no HTML was sent, keep the old HTML and just add error and info messages
    if (content === '' && (info !== '' || response.page.form_errors))
      {
      Kwf.handleFormErrors(response.page);
      if (info !== '')
        {
        context.insertBefore(toDOMnode(info), context.firstChild);
        }
      }
    else
      {
      context.innerHTML = content;
      self.findForms();
      }

    self.dispatchEvent('ready', caller);
    caller = null;
    self.response = null;

    if (!ignore_pushstate)
      {
      if (history.pushState)
        {
        history.pushState({url: url}, null, url);
        }
      else
        {
        Kwf.ignore_hash_change = 1;
        location.hash = '#' + url;
        }
      }

    // Restore the form_btn
    if (btn)
      {
      btn.disabled = '';
      self.form_btn = null;
      }
    }