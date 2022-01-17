function engine_sendCandidates(candidates) {
    var list = [];
    var len = candidates.length;
    for (var id = 0; id < len; id++) {
      var strs = candidates[id];
      var cand = this._inputTraditionalChinese ? strs[1] : strs[0];
      if (id == 0) {
        this._firstCandidate = cand;
      }
      var data = new IMEngine.CandidateData(id, strs);
      list.push([cand, data.serialize()]);
    }
    this._glue.sendCandidates(list);
  }