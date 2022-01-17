function addDetail(elem, ind) {
  // reset keys if necessary
  var resetKey = this.createdAcitivitiesListInd.indexOf(elem.activityId) === -1;

  if (resetKey) {
    this.pipe.del('activity:' + elem.activityId + ':details');
    this.createdAcitivitiesListInd.push(elem.activityId);
  }
  // add activity id in cat:n:activities
  this.pipe.sadd('activity:' + elem.activityId + ':details', ind);
  // create activity hset
  this.pipe.del('detail:' + ind);
  this.pipe.hmset('detail:' + ind, elem);
}