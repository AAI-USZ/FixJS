function acquireLauncher() {
  if (launcher) {
    return;
  }
  try {
    var nodeUsb = require('node-usb'), usb = new nodeUsb.Usb(), _ = require('underscore');
    usb.refresh();
    usb.setDebugLevel(3);

    var launcher = _.find(usb.getDevices(), function (device) {
      var descriptor = device.getDeviceDescriptor();
      return descriptor.idVendor == 0x2123 && descriptor.idProduct == 0x1010;
    });

    if (!launcher) {
      console.error('Launcher not found :(');
      return;
    }
    var launcherInterface = launcher.getInterfaces()[0];
    launcherInterface.detachKernelDriver();
    launcherInterface.claim();
    console.log('Attached rocket-adapter ...');
    process.on('exit', function () {
      console.log('Detaching rocket-adapter ...');
      launcherInterface.release(function (data) {
        console.log('Rocket-adapter detached: ' + data);
      });
    });
  } catch (err) {
    console.error(err.stack);
  }
}