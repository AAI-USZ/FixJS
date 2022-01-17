function (method) {
      method.analysis = new Analysis(method, opts);
      method.analysis.analyzeControlFlow();
      method.analysis.restructureControlFlow();
      if (method.analysis) {
        method.analysis.traceCFG(writer, method, "G" + graph + "_");
        graph += 1;
      }
    }