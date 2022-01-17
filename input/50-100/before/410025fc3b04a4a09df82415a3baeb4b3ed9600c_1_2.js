function UnassignedAssignment(arg, isIncompleteName) {
  this.param = new canon.Parameter({
    name: '__unassigned',
    type: 'string'
  });
  this.paramIndex = -1;
  this.isIncompleteName = isIncompleteName;
  this.onAssignmentChange = util.createEvent('UnassignedAssignment.onAssignmentChange');

  this.conversion = new Conversion(undefined, arg, Status.INCOMPLETE, '');
  this.conversion.assign(this);
}