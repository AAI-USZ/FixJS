function(e) {
      if (req.readyState === 4) {
        if (req.status === 200) {
          var data = req.responseText.split('\n');
          var dispDate = document.getElementById('gaia-commit-date');
          var disp = document.getElementById('gaia-commit-hash');
          // XXX it would be great to pop a link to the github page
          // showing the commit but there doesn't seem to be any way
          // to tell the browser to do it.
          var d = new Date(parseInt(data[1] + '000', 10));
          dispDate.textContent = dateToUTC(d);
          disp.textContent = data[0];
        } else {
          console.error('Failed to fetch gaia commit: ', req.statusText);
        }
      }
    }