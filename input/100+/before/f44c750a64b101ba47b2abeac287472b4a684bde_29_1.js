function(status, message, object_id, traverse_type, cb)

  {

    var

    _data = message[NODE_LIST] || [],  

    error_ms = ui_strings.S_DRAGONFLY_INFO_MESSAGE + 'this.__handle_dom failed in DOMBaseData',

    splice_args = null,

    i = 0;

    

    if (!status)

    {

      switch (traverse_type)

      {

        // traverse_type 'node' so far not supported

        case TRAVERSE_SEARCH:

        case "parent-node-chain-with-children":

        {

          if (traverse_type != "search" || !object_id)

          {            

            this._data = _data;

            this._unfold_pseudos();

            break;

          }

        }

        case "subtree":

        case "children":

        case "node":

        {

          for (; this._data[i] && this._data[i][ID] != object_id; i++);

          if (this._data[i])

          {

            // A search with an object_id searches only in the subtree 

            // of that node, but returns a tree with the ancestor up 

            // to the document.

            // For the use case in Dragonfly we cut away the chain from 

            // the object up to the document.

            if (traverse_type == "search") 

            {

              this.clear_search();

              for (var j = 0; _data[j] && _data[j][ID] != object_id; j++);

              if (_data[j])

              {

                _data = _data.slice(j);

              }

            }

            // if object_id matches the one of the first node 

            // of the return data the traversal was subtree

            // a search can return no data 

            if (_data[0])

            { 

              if (object_id == _data[0][ID])

              {

                this.collapse(object_id);

                this._data.insert(i, _data, 1);

              }

              else

              {

                this._data.insert(i + 1, _data);

              }

              

            }

            this._unfold_pseudos(i, _data.length, traverse_type == "subtree");

          }

          else if (!this._data.length)

          {

            this._data = _data;

            this._unfold_pseudos();

          }

          else

            opera.postError(error_ms);

          break;

        }

      }

      this._mime = this._set_mime();

      if (cb)

        cb();

    }

    else if(traverse_type == "search")

    {

      this._data = [];

      cb();

    }

    else if (this._has_error_handling)

    {

      this.error = message[ERROR_MSG];

      if (cb)

        cb();

    }

    else

    {

      opera.postError(error_ms + ' ' + JSON.stringify(message));

    }

    this._isprocessing = false;

  }