function bodyOnLoad() {
  // initialize form
  // canvas
  kiji.canvas = document.getElementById('canvas');
  kiji.context = canvas.getContext('2d');
  // load background
  kiji.bg = new Image();
  kiji.bg.onload = bgOnLoad;
  kiji.bg.src = 'report1.png';
  // restore bg pan
  kiji.dx = 1*localStorage.getItem('KIJI_DX');
  kiji.dy = 1*localStorage.getItem('KIJI_DY');
  kiji.zoom = 1.0*localStorage.getItem('KIJI_ZOOM');
  if (kiji.zoom <= 0) kiji.zoom = 1;
  // load report from local storage
  if (localStorage.getItem('KIJI_REPORT')) {
    kiji.report = JSON.parse(localStorage.getItem('KIJI_REPORT'));
    itemBind(kiji.report);
    // I tend to screw things during development, so I push clean report straight into undo
    undoPush(kiji.report);
  }
  // mouse handler
  kiji.mouse_handler = new MouseHandler();
  // fill selected item to inputs
  kiji.current_item = itemFirstSelected(kiji.report);
  attributesShow(kiji.current_item);
  // initial tool = move
  setTool(document.getElementById(kiji.tool));
}