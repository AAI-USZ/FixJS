function add(userAddress, fullName, avatarUrl) {
  data[userAddress] = {
    n: fullName,
    a: avatarUrl
  }
  var words = fullName.split(' ');
  for(var i in words) {
    if(!index[words[i]]) {
      index[words[i].toLowerCase()]={};
    }
    index[words[i].toLowerCase()][userAddress]=true;
  }
}