function bsm_open(origin, name, url) {
    var app = Applications.getByOrigin(origin);
    if (!app || !hasBackgroundPermission(app))
      return false;

    if (frames[origin] && frames[origin][name])
      return frames[origin][name];

    var frame = document.createElement('iframe');
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
    return frames[origin][name];
  }