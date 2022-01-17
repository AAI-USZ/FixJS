function(event, target, object_ids)

  {

    var container = target;

    while (container && !container.getAttribute("data-storage-id"))

    {

      container = container.parentElement;

    }

    if (container)

    {

      var storage_id = container.getAttribute("data-storage-id");

      var selection = container.querySelectorAll("tr.selected");

      for (var i=0, selected; selected = selection[i]; i++)

      {

        var rt_id = Number(selected.querySelector("[name=rt_id]").value);

        var key = selected.querySelector("[name=key]").value;

        var cb = function(){};

        if (i === selection.length - 1)

        {

          cb = function(storage_id, success)

          {

            window.storages[storage_id].update();

          }.bind(this, storage_id);

        }

        window.storages[storage_id].remove_item(rt_id, key, cb);

      };

      return false;

    }

  }