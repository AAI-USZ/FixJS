function() {
          var myId;
          if ($(this).attr('id') != null) {
            myId = $(this).attr('id');
            if (/CNID_[0-9]+/.test(myId)) {
              if (!(CNEditor._lines[myId] != null)) {
                return alert("ERROR: missing line " + myId);
              }
            }
          }
        }