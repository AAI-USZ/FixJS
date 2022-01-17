function() {
    var conflict, data, fixed, implemented, in_progress, irrelevant, news, stuck, total, workaround;
    total = $(".item.shown").size();
    stuck = $(".item.shown[data-implementation-status='STUCK']").size();
    news = $(".item.shown[data-implementation-status='NEW']").size();
    in_progress = $(".item.shown[data-implementation-status='IN_PROGRESS']").size();
    fixed = $(".item.shown[data-implementation-status='FIXED']").size();
    workaround = $(".item.shown[data-implementation-status='WORKAROUND']").size();
    irrelevant = $(".item.shown[data-implementation-status='IRRELEVANT']").size();
    conflict = $(".item.shown[data-implementation-status='CONFLICT']").size();
    data = {};
    if (total) data.total = total;
    stuck = news + workaround + stuck;
    if (stuck) data.stuck = stuck;
    implemented = fixed + irrelevant;
    if (implemented) data.implemented = implemented;
    if (in_progress) data.in_progress = in_progress;
    if (conflict) data.conflict = conflict;
    run_templates("summary", data, "#summary");
    setup_tooltips("#summary");
    $("#summary .total").click(function() {
      status_filter = null;
      do_search();
      return false;
    });
    $("#summary .stuck").click(function() {
      status_filter = ['STUCK', 'NEW', 'WORKAROUND'];
      do_search();
      return false;
    });
    $("#summary .implemented").click(function() {
      status_filter = ['FIXED', 'IRRELEVANT'];
      do_search();
      return false;
    });
    $("#summary .in_progress").click(function() {
      status_filter = ['IN_PROGRESS'];
      do_search();
      return false;
    });
    return $("#summary .conflict").click(function() {
      status_filter = ['CONFLICT'];
      do_search();
      return false;
    });
  }