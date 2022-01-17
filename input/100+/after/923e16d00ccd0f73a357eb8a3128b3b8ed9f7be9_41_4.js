function(event, target)

  {

    this.mode = MODE_EDIT;



    var row = target;

    while (row && row.nodeName != "tr")

    {

      row = row.parentElement;

    }

    var item_id = row && row.getAttribute("data-object-id");



    var header_row = row;

    while (header_row && !header_row.hasClass("header"))

    {

      header_row = header_row.previousElementSibling;

    }

    var runtime_id = header_row && header_row.getAttribute("data-object-id");



    var container = target;

    while (container && !container.getAttribute("data-storage-id"))

    {

      container = container.parentElement;

    }



    if (container && runtime_id)

    {

      var insert_before_row;

      if (item_id) // came from context menu of an item

      {

        insert_before_row = container.querySelector("[data-object-id='" + item_id + "']");

        if (insert_before_row && insert_before_row.nextElementSibling)

        {

          insert_before_row = insert_before_row.nextElementSibling;

        }

      }

      else // came from add storage button

      {

        // find header row, traverse to summation_row

        insert_before_row = container.querySelector("[data-object-id='" + runtime_id + "']");

        while (insert_before_row && !insert_before_row.hasClass("sortable-table-summation-row"))

        {

          insert_before_row = insert_before_row.nextElementSibling;

        }

      }



      if (insert_before_row)

      {

        var templ = document.documentElement.render(window.templates.storage.add_storage_row(runtime_id));

        var inserted = insert_before_row.parentElement.insertBefore(templ, insert_before_row);

        this._handlers["select-row"](event, inserted);

        var textarea = inserted.querySelector("textarea");

        if (textarea)

        {

          this._handlers["textarea-autosize"](null, textarea);

        }

        var key = inserted.querySelector("[name=key]");

        if (key)

        {

          key.focus();

        }

      }

    }

  }