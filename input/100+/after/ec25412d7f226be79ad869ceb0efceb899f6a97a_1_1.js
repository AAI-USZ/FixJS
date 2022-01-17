function () {
    happened = {urgent_tasks: 0, archived_tasks: 0, tasks: 0};

    tasks.bind('reset', inc('tasks'));
    archived_tasks.bind('reset', inc('archived_tasks'));
    urgent_tasks.bind('reset', inc('urgent_tasks'));

    tasks.reset([ {id: 0, archived: 0, urgent: 1, order: 0}
                , {id: 1, archived: 1, urgent: 1, order: 1}
                , {id: 2, archived: 1, urgent: 0, order: 2}]);

    assert.equal(happened.tasks, 1);
    assert.equal(happened.archived_tasks, 1);
    assert.equal(happened.urgent_tasks, 1);

    assert.deepEqual(tasks.pluck('id'), [0, 1, 2]);
    assert.deepEqual(archived_tasks.pluck('id'), [2, 1]);
    assert.deepEqual(urgent_tasks.pluck('id'), [1, 0]);
    assert.deepEqual(_.pluck(tasks.models, 'cid'), ['c6', 'c7', 'c8']);
    assert.deepEqual(_.pluck(archived_tasks.models, 'cid'), ['c8', 'c7']);
    assert.deepEqual(_.pluck(urgent_tasks.models, 'cid'), ['c7', 'c6']);

    happened = {
      archived_tasks: 0
    , urgent_tasks: 0
    , tasks: 0
    , tasks_add: 0
    , archived_tasks_add: 0
    , urgent_tasks_add: 0
    , tasks_remove: 0
    , archived_tasks_remove: 0
    , urgent_tasks_remove: 0
    };
    tasks.unbind('add');
    archived_tasks.unbind('add');
    urgent_tasks.unbind('add');
    tasks.unbind('reset');
    archived_tasks.unbind('reset');
    urgent_tasks.unbind('reset');
    tasks.unbind('remove');
    archived_tasks.unbind('remove');
    urgent_tasks.unbind('remove');

    tasks.bind('add', inc('tasks_add'));
    archived_tasks.bind('add', inc('archived_tasks_add'));
    urgent_tasks.bind('add', inc('urgent_tasks_add'));
    tasks.bind('reset', inc('tasks'));
    archived_tasks.bind('reset', inc('archived_tasks'));
    urgent_tasks.bind('reset', inc('urgent_tasks'));
    tasks.bind('remove', inc('tasks_remove'));
    archived_tasks.bind('remove', inc('archived_tasks_remove'));
    urgent_tasks.bind('remove', inc('urgent_tasks_remove'));

    archived_tasks.reset([{
      id: 4
    , archived: 0
    , urgent: 1
    , order: 4
    }, {
      id: 5
    , archived: 1
    , urgent: 0
    , order: 5
    }, {
      id: 6
    , archived: 1
    , urgent: 0
    , order: 6
    }]);

    assert.equal(happened.tasks_add, 0);
    assert.equal(happened.archived_tasks_add, 0);
    assert.equal(happened.urgent_tasks_add, 0);
    assert.equal(happened.tasks, 1);
    assert.equal(happened.archived_tasks, 1);
    assert.equal(happened.urgent_tasks, 0);
    assert.equal(happened.tasks_remove, 0);
    assert.equal(happened.archived_tasks_remove, 0);
    assert.equal(happened.urgent_tasks_remove, 0);

    assert.deepEqual(tasks.pluck('id'), [0, 1, 2, 4, 5, 6]);
    assert.deepEqual(archived_tasks.pluck('id'), [6, 5]);
    assert.deepEqual(urgent_tasks.pluck('id'), [1, 0]);
    assert.deepEqual(_.pluck(tasks.models, 'cid'), ['c6', 'c7', 'c8', 'c9', 'c10', 'c11']);
    assert.deepEqual(_.pluck(archived_tasks.models, 'cid'), ['c11', 'c10']);
    assert.deepEqual(_.pluck(urgent_tasks.models, 'cid'), ['c7', 'c6']);

    happened = {
      archived_tasks: 0
    , urgent_tasks: 0
    , tasks: 0
    , tasks_add: 0
    , archived_tasks_add: 0
    , urgent_tasks_add: 0
    , tasks_remove: 0
    , archived_tasks_remove: 0
    , urgent_tasks_remove: 0
    };
    tasks.unbind('add');
    archived_tasks.unbind('add');
    urgent_tasks.unbind('add');
    tasks.unbind('reset');
    archived_tasks.unbind('reset');
    urgent_tasks.unbind('reset');
    tasks.unbind('remove');
    archived_tasks.unbind('remove');
    urgent_tasks.unbind('remove');

    tasks.bind('add', inc('tasks_add'));
    archived_tasks.bind('add', inc('archived_tasks_add'));
    urgent_tasks.bind('add', inc('urgent_tasks_add'));
    tasks.bind('reset', inc('tasks'));
    archived_tasks.bind('reset', inc('archived_tasks'));
    urgent_tasks.bind('reset', inc('urgent_tasks'));
    tasks.bind('remove', inc('tasks_remove'));
    archived_tasks.bind('remove', inc('archived_tasks_remove'));
    urgent_tasks.bind('remove', inc('urgent_tasks_remove'));

    urgent_tasks.reset([{
      id: 1
    , archived: 1
    , urgent: 1
    , order: 1
    }, {
      id: 5
    , archived: 1
    , urgent: 0
    , order: 5
    }, {
      id: 6
    , archived: 1
    , urgent: 1
    , order: 6
    }, {
      id: 7
    , archived: 1
    , urgent: 1
    , order: 7
    }]);

    assert.equal(happened.tasks_add, 0);
    assert.equal(happened.archived_tasks_add, 0);
    assert.equal(happened.urgent_tasks_add, 0);
    assert.equal(happened.tasks, 1);
    assert.equal(happened.archived_tasks, 0);
    assert.equal(happened.urgent_tasks, 1);
    assert.equal(happened.tasks_remove, 0);
    assert.equal(happened.archived_tasks_remove, 0);
    assert.equal(happened.urgent_tasks_remove, 0);

    assert.deepEqual(tasks.pluck('id'), [0, 1, 2, 4, 5, 6, 7]);
    assert.deepEqual(archived_tasks.pluck('id'), [6, 5]);
    assert.deepEqual(urgent_tasks.pluck('id'), [7, 6, 1]);
    assert.deepEqual(_.pluck(tasks.models, 'cid'), ['c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12']);
    assert.deepEqual(_.pluck(archived_tasks.models, 'cid'), ['c11', 'c10']);
    assert.deepEqual(_.pluck(urgent_tasks.models, 'cid'), ['c12', 'c11', 'c7']);
  }