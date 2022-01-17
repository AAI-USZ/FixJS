function(idx) {
      var st = json[idx];
      var gr = graph(st.process, st.type, st.stat);
      my.element.append(gr.element());
    }