function(node, index, alike)
  {
    var ret = [];

    if (node && node[PSEUDO_ELEMENT])
    {
      for (var i = 0, cur; cur = node[PSEUDO_ELEMENT][i]; i++)
      {
        if (alike.contains(cur[PSEUDO_TYPE]))
        {
          ret.push([node[ID],
                    PSEUDO_NODE,
                    PSEUDO_NAME[cur[PSEUDO_TYPE]],
                    node[DEPTH] + 1]);
        }
      }
    }

    if (ret.length)
    {
      this._data.insert(index, ret);
    }
    return ret.length;
  }