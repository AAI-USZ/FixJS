function bsm_open(origin, name, url, frame) {
    var app = Applications.getByOrigin(origin);
    if (!app || !hasBackgroundPermission(app))
      return false;

    if (frames[origin] && frames[origin][name]) {
      // XXX: the window with the same name is opened but we cannot
      // return the window reference back to mozbrowseropenwindow request
      return false;
    }

    if (!frame) {
      frame = document.createElement('iframe');
    }
    frame.className = 'backgroundWindow';
    frame.setAttribute('mozbrowser', 'true');
    frame.setAttribute('mozapp', app.manifestURL);
    frame.src = url;
    frame.dataset.frameType = 'background';
    frame.dataset.frameName = name;
    frame.dataset.frameOrigin = origin;

    if (!frames[origin])
      frames[origin] = {};
    frames[origin][name] = frame;

    document.body.appendChild(frame);
    return true;
  }