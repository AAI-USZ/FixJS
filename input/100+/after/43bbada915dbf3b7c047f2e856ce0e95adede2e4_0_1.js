function () {
    var graph_id = Session.get('selected_graph');
    if (graph_id)
      Meteor.subscribe('circles', graph_id);
    console.log("autosubscribe!!!");
  }