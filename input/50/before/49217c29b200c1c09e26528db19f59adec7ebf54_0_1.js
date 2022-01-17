function (callback) {
  console.log('Meteor server successfully fetched and loaded (branch:mrt-test)');
  __meteor_bootstrap__.startup_hooks.push(callback);
}