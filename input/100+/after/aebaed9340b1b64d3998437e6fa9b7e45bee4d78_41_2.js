function(event, target)

  {

    this.mode = MODE_DEFAULT;

    // When target is passed, it is a node in the storage view. When called by this.onclick 

    // no target is passed, all .edit_mode elems in .storage_view are used for submitting

    var container = target || document.querySelector(".storage_view");

    while (container && !container.getAttribute("data-storage-id"))

    {

      container = container.parentElement;

    }



    if (container)

    {

      var storage_id = container.getAttribute("data-storage-id");

      var edit_trs = container.querySelectorAll("tr.edit_mode");

      for (var i = 0, edit_tr; edit_tr = edit_trs[i]; i++)

      {

        var rt_id        = Number(edit_tr.querySelector("[name=rt_id]").value);

        var original_key = edit_tr.querySelector("[name=original_key]")

                           && edit_tr.querySelector("[name=original_key]").value;

        var key          = edit_tr.querySelector("[name=key]").value;

        var value        = edit_tr.querySelector("[name=value]").value;



        var context = window.storages[storage_id];

        var set_item_bound = context.set_item.bind(context, rt_id, key, value, this._update_bound);

        var remove_and_set_item_bound = context.remove_item.bind(context, rt_id, original_key, set_item_bound);



        if (key && original_key)

        {

          remove_and_set_item_bound();

        }

        else if (key)

        {

          set_item_bound();

        }

        else

        {

          this._update_bound();

        }

      }

      return false;

    }

  }