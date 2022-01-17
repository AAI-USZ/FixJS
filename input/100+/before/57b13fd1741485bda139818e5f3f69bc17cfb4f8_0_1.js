function (recursive) {
    if (recursive) {
      // recursive case: destroy all descendent ranges too
      // (more efficient than actually recursing)

      this.visit(function(is_start, range) {
        if (is_start) {
          range._start = null;
          range._end = null;
        }
      }, function(is_start, node) {
        if (! is_start) {
          // when leaving a node, force-clean its children
          for(var n = node.firstChild; n; n = n.nextSibling) {
            Meteor.ui._LiveRange._clean_node(this.tag, n, true);
          }
        }
      });

      this._remove_entries(this._start, 0, this._start_idx);
      this._remove_entries(this._end, 1, 0, this._end_idx + 1);
      // force-clean the top-level nodes in this, besides _start and _end
      if (this._start !== this._end) {
        for(var n = this._start.nextSibling;
            n !== this._end;
            n = n.nextSibling) {
          Meteor.ui._LiveRange._clean_node(this.tag, n, true);
        }
      }

      this._start = this._end = null;

    } else {
      this._remove_entries(this._start, 0, this._start_idx, this._start_idx + 1);
      this._remove_entries(this._end, 1, this._end_idx, this._end_idx + 1);
      this._start = this._end = null;
    }
  }