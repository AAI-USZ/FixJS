function(event, target)

  {

    this.mode = MODE_EDIT;



    var container = target;

    while (container && !container.getAttribute("data-storage-id"))

    {

      container = container.parentNode;

    }

    if (container)

    {

      var ref = target.getAttribute("data-object-id");

      var tr = container.querySelector("tr[data-object-id='"+ref+"']")

      tr.addClass("edit_mode");

      this._handlers["select-row"](event, tr);

      var textarea = tr.querySelector("textarea");

      if (textarea)

      {

        this._handlers["textarea-autosize"](null, textarea);

      }

    }

  }