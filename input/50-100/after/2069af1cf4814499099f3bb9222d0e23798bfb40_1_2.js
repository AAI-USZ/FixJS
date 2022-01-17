function UnassignedAssignment(requisition, arg, isIncompleteName) {
  this.param = new canon.Parameter({
    name: '__unassigned',
    description: l10n.lookup('cliOptions'),
    type: {
      name: 'param',
      requisition: requisition,
      isIncompleteName: isIncompleteName
    },
  });
  this.paramIndex = -1;
  this.onAssignmentChange = util.createEvent('UnassignedAssignment.onAssignmentChange');

  this.conversion = this.param.type.parse(arg);
  this.conversion.assign(this);
}