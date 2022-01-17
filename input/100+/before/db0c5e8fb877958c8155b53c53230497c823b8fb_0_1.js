function add(userAddress, obj) {
  data[userAddress] = {
    userAddress: userAddress,
    name: obj.name,
    avatar: obj.avatar
  }
  var words = obj.name.split(' ');
  for(var i in words) {
    for(var j=3; j<=words[i].length; j++) {
      var prefix = words[i].substring(0, j);
      if(!index[prefix]) {
        index[prefix.toLowerCase()]={};
      }
      index[prefix.toLowerCase()][userAddress]=true;
    }
  }
  dumpDb();
}