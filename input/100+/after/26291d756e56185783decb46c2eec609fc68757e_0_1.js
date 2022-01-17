function (json, filterFn) {
  var groups = []
    , nsHash
    , byIdHash
    , selectHash
    , sortHash
    , skipHash
    , limitHash
    , group
    , fields, field;

  for (var method in json) {
    var val = json[method];
    switch (method) {
      case 'from':
        nsHash = noDots(val);
        break;
      case 'byId':
        byIdHash = ABBREVS.byId + SEP + JSON.stringify(val);
        break;
      case 'only':
      case 'except':
        selectHash = ABBREVS[method];
        for (var i = 0, l = val.length; i < l; i++) {
          field = val[i];
          selectHash += SEP + noDots(field);
        }
        break;
      case 'sort':
        sortHash = ABBREVS.sort + SEP;
        for (var i = 0, l = val.length; i < l; i+=2) {
          field = val[i];
          sortHash += noDots(field) + SEP + ABBREVS[val[i+1]];
        }
        break;
      case 'skip':
        skipHash = ABBREVS.skip + SEP + val;
        break;
      case 'limit':
        limitHash = ABBREVS.limit + SEP + val;
        break;

      case 'where':
        break;
      case 'within':
      case 'contains':
        for (var k in val) {
          val[k] = val[k].sort();
        }
        // Intentionally fall-through without a break
      case 'equals':
      case 'notEquals':
      case 'gt':
      case 'gte':
      case 'lt':
      case 'lte':
        group = [ABBREVS[method]];
        fields = group[group.length] = [];
        groups.push(group);
        for (field in val) {
          fields.push([field, JSON.stringify(val[field])]);
        }
        break;
    }
  }

  var hash = nsHash;
  if (byIdHash)  hash += SEP + byIdHash;
  if (sortHash)   hash += SEP + sortHash;
  if (selectHash) hash += SEP + selectHash;
  if (skipHash)   hash += SEP + skipHash;
  if (limitHash)  hash += SEP + limitHash;

  for (var i = groups.length; i--; ) {
    group = groups[i];
    group[1] = group[1].sort(comparator);
  }

  groups = groups.sort( function (groupA, groupB) {
    var pathA = groupA[0]
      , pathB = groupB[0];
    if (pathA < pathB)   return -1;
    if (pathA === pathB) return 0;
    return 1;
  });

  for (i = 0, l = groups.length; i < l; i++) {
    group = groups[i];
    hash += SEP + SEP + group[0];
    fields = group[1];
    for (var j = 0, m = fields.length; j < m; j++) {
      var pair = fields[j]
        , field = pair[0]
        , val   = pair[1];
      hash += SEP + noDots(field) + SEP + val;
    }
  }

  if (filterFn) {
    // TODO: Do a less ghetto hash function here
    hash += SEP + 'filterFn' + SEP +
      filterFn.toString().replace(/[\s(){},.]/g, function(match) {
        return match.charCodeAt(0);
      });
  }

  return hash;
}