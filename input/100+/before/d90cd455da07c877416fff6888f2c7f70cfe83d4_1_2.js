function(apply) {
    // If nothing was changed before .apply call
    if (apply.node.state.equalTo(apply.state)) {
      // Skip this apply as it can't be optimized
      return;
    }

    // Find a node with state nested into `apply`'s state
    var result = utils.reduceTree(tree, function(acc, node) {
      // Apply should not redirect to itself
      if (node.id === apply.node.id) return acc;

      // Compare states
      var score = apply.state.isReachable(
        node.state,
        options.engine.name === 'sort-group'
      );

      // Find the best match
      if (score !== null && score >= 0 && score < acc.score) {
        acc.score = score;
        acc.node = node;
      }

      return acc;
    }, { score: Infinity, node: tree });

    // If apply can be inlined - create subtree
    if (apply.state.isInlineable() && options.engine.name === 'sort-group') {
      var fnId = options.identifier.generate(),
          subtree = options.compile(templates, {
            state: apply.state.clone(),
            values: options.values,
            id: options.identifier
          });

      fnList.add(fnId, subtree);
      result.node = {
        id: fnId,
        subtree: subtree
      };
    // If state is small and node isn't a leaf
    // create ghosts and render everything again
    } else if (!recompiled  && options.options['ghosts'] &&
               result.node.tag && result.node.state.isGhostable()) {

      var templateId = apply.node.template,
          tagId = result.node.tagId,
          template = templates[templateId],
          ghost = ghosts[templateId] || {
            id: templateId,
            template: template,
            applies: [],
            tags: {}
          },
          tag = ghost.tags[tagId] || (ghost.tags[tagId] = {
            id: tagId,
            tag: result.node.tag,
            values: {}
          }),
          body = template[1],
          unique = false;

      unique = template[0].every(function(pair) {
        return pair[0] !== result.node.tagId;
      });

      // Only create ghosts if predicate isn't already present
      if (unique) {
        result.node.cases.forEach(function(branch) {
          tag.values[utils.stringify(branch[0])] = branch[0];
        });

        apply.op.source = apply.node.id;

        // Store apply's body for ghost cloning
        ghost.applies.push(apply.op);

        ghosts[templateId] = ghost;
        forceRecompile = true;
        return;
      }
    }

    // If the node is matching our condition - we should wrap it into a
    // function
    result.node = digIn(apply.state, result.node);
    result.node.fn = true;

    // Mark apply as optimized
    apply.op.code = fnList.getName(result.node) + '.call(this)';
    apply.op.node = result.node.id;
    apply.op.host = apply.node.id;

    if (!apply.node.successors) apply.node.successors = [];
    apply.node.successors.push({
      id: result.node.id,
      subtree: result.node.subtree
    });
  }