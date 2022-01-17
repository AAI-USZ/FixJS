function (tag, start, end, inner) {
    if (start.nodeType === 11 /* DocumentFragment */) {
      end = start.lastChild;
      start = start.firstChild;
    } else {
      if (! start.parentNode)
        throw new Error("LiveRange start and end must have a parent");
    }
    end = end || start;

    this.tag = tag; // must be set before calling _ensure_tag

    var endpoints = Meteor.ui._wrap_endpoints(start, end);
    start = this._ensure_tag(endpoints[0]);
    end = this._ensure_tag(endpoints[1]);

    // Decide at what indices in start[tag][0] and end[tag][1] we
    // should insert the new range.
    //
    // The start[tag][0] array lists the other ranges that start at
    // `start`, and we must choose an insertion index that puts us
    // inside the ones that end at later siblings, and outside the ones
    // that end at earlier siblings.  The ones that end at the same
    // sibling (i.e. share both our start and end) we must be inside
    // or outside of depending on `inner`.  The array lists ranges
    // from the outside in.
    //
    // The same logic applies to end[tag][1], which lists the other ranges
    // that happen to end at `end` from in the inside out.
    //
    // Liveranges technically start just before, and end just after, their
    // start and end nodes to which the liverange data is attached.

    var start_index = findPosition(start[tag][0], true, end, start, inner);
    var end_index = findPosition(end[tag][1], false, start, end, inner);

    // this._start is the node N such that we begin before N, but not
    // before the node before N in the preorder traversal of the
    // document (if there is such a node.) this._start[this.tag][0]
    // will be the list of all LiveRanges for which this._start is N,
    // including us, sorted in the order that the ranges start. and
    // finally, this._start_idx is the value such that
    // this._start[this.tag][0][this._start_idx] === this.
    //
    // Similarly for this._end, except it's the node N such that we end
    // after N, but not after the node after N in the postorder
    // traversal; and the data is stored in this._end[this.tag][1], and
    // it's sorted in the order that the ranges end.

    // Set this._start, this._end, this._start_idx, this._end_idx
    this._insert_entries(start, 0, start_index, [this]);
    this._insert_entries(end, 1, end_index, [this]);
  }