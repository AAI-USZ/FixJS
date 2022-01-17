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