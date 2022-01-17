function addDetail(elem, ind) {
  // reset keys if necessary
  var resetKey = this.createdCategoriesListInd.indexOf(elem.cat) === -1;

  if (resetKey) {
    this.pipe.del('activity:' + elem.activityId + ':details');
    this.createdCategoriesListInd.push(elem.cat);
  }
  // add activity id in cat:n:activities
  this.pipe.sadd('activity:' + elem.activityId + ':details', ind);
  // create activity hset
  this.pipe.del('detail:' + ind);
  this.pipe.hmset('detail:' + ind, elem);
}