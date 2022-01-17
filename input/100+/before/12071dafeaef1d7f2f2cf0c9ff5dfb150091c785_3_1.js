function(nodeparams) {
      nodeparams.title = nodeparams.title || 'anonymous';
      $.extend(this, {
        id: 0,                /** The ID of this node. */
        loaded: false,        /** Flag to see if this is loaded. */
        value: 0,             /** The input value for this node. */
        title: '',            /** The title of this node. */
        has_children: true,   /** Boolean if this node has children. */
        children: [],         /** Array of children. */
        level: 0,             /** The level of this node. */
        odd: false,           /** The odd/even state of this row. */
        checked: false,       /** If this node is checked. */
        busy: false,          /** If this node is busy. */
        display: $(),         /** The display of this node. */
        input: $(),           /** The input display. */
        link: $(),            /** The link display. */
        span: $(),            /** The span display. */
        childlist: $()        /** The childlist display. */
      }, nodeparams);

      // Say that we are a TreeNode.
      this.isTreeNode = true;
    }