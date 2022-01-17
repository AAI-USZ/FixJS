function(json) {
    my.element.empty();

    json.stack.forEach(function(idx) {
      var st = json[idx];
      var gr = graph(st.process, st.type, st.stat);
      my.element.append(gr.element());
    });

    _super.refresh(json);
  }