function(domNode) {
    var header = this.header, body = this.body;

    // -- Header
    function addHeaderEmails(lineClass, peeps) {
      var lineNode = domNode.getElementsByClassName(lineClass)[0];

      if (!peeps || !peeps.length) {
        lineNode.classList.add('collapsed');
        return;
      }

      // Because we can avoid having to do multiple selector lookups, we just
      // mutate the template in-place...
      var peepTemplate = msgNodes['peep-bubble'],
          nameTemplate =
            peepTemplate.getElementsByClassName('msg-peep-name')[0],
          addressTemplate =
            peepTemplate.getElementsByClassName('msg-peep-address')[0];
      for (var i = 0; i < peeps.length; i++) {
        var peep = peeps[i];
        nameTemplate.textContent = peep.name || '';
        addressTemplate.textContent = peep.address;
        lineNode.appendChild(peepTemplate.cloneNode(true));
      }
    }

    addHeaderEmails('msg-envelope-from-line', [header.author]);
    addHeaderEmails('msg-envelope-to-line', body.to);
    addHeaderEmails('msg-envelope-cc-line', body.cc);
    addHeaderEmails('msg-envelope-bcc-line', body.bcc);

    var dateNode = domNode.getElementsByClassName('msg-envelope-date')[0];
    dateNode.dataset.time = header.date.valueOf();
    dateNode.textContent = prettyDate(header.date);

    domNode.getElementsByClassName('msg-envelope-subject')[0]
      .textContent = header.subject;

    // -- Body (Plaintext)
    var bodyNode = domNode.getElementsByClassName('msg-body-container')[0];
    var rep = body.bodyRep;
    for (var i = 0; i < rep.length; i += 2) {
      var node = document.createElement('div'), cname;

      var etype = rep[i]&0xf, rtype = null;
      if (etype === 0x4) {
        var qdepth = (((rep[i] >> 8)&0xff) + 1);
        if (qdepth > 8)
          cname = MAX_QUOTE_CLASS_NAME;
        else
          cname = CONTENT_QUOTE_CLASS_NAMES[qdepth];
      }
      else {
        cname = CONTENT_TYPES_TO_CLASS_NAMES[etype];
      }
      if (cname)
        node.setAttribute('class', cname);
      node.textContent = rep[i+1];
      bodyNode.appendChild(node);
    }

    // -- Attachments (footer)
    var attachmentsContainer =
      domNode.getElementsByClassName('msg-attachments-container')[0];
    if (body.attachments && body.attachments.length) {
      var attTemplate = msgNodes['attachment-item'],
          filenameTemplate =
            attTemplate.getElementsByClassName('msg-attachment-filename')[0],
          filetypeTemplate =
            attTemplate.getElementsByClassName('msg-attachment-filetype')[0];
      for (var iAttach = 0; iAttach < body.attachments.length; iAttach++) {
        var attachment = body.attachments[iAttach];
        filenameTemplate.textContent = attachment.filename;
        // XXX perform localized mimetype translation stuff
        filetypeTemplate.textContent = attachment.mimetype;
        attachmentsContainer.appendChild(attTemplate.cloneNode(true));
      }
    }
    else {
      attachmentsContainer.classList.add('collapsed');
    }
  }