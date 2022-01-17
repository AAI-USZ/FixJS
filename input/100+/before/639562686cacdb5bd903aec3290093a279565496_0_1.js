function drawGraphics3D(container, data) {
  // TODO: use the actual graphic given by data.
  // data is decoded JSON data such as
  // {"elements": [{"coords": [[[1.0, 0.0, 0.0], null], [[1.0, 1.0, 1.0], null], [[0.0, 0.0, 1.0], null]], "type": "polygon", "faceColor": [0, 0, 0, 1]}], "axes": {}, "extent": {"zmax": 1.0, "ymax": 1.0, "zmin": 0.0, "xmax": 1.0, "xmin": 0.0, "ymin": 0.0}}
  // The nulls are the "scaled" parts of coordinates that
  // depend on the size of the final graphics (see Mathematica's Scaled). 

  // TODO: update the size of the container dynamically
  // (we also need some mechanism to update the enclosing <mspace>).

  // TODO: create axes using the (yet to be generated) information in data.axes.

  // TODO: colors, lighting/shading, handling of VertexNormals.

  var camera, scene, renderer, boundbox,
    isMouseDown = false, onMouseDownPosition, radius,
    tmpx, tmpy, tmpz, 
    theta = 45, onMouseDownTheta = 45, phi = 60, onMouseDownPhi = 60;

  // Center of the scene
  var center = new THREE.Vector3(
    0.5*(data.extent["xmin"] + data.extent["xmax"]),
    0.5*(data.extent["ymin"] + data.extent["ymax"]), 
    0.5*(data.extent["zmin"] + data.extent["zmax"]));

  // Where the camera is looking
  var focus = new THREE.Vector3(center.x, center.y, center.z);

  radius = 2*Math.sqrt(
   Math.pow(data.extent["xmax"]-data.extent["xmin"],2) +
   Math.pow(data.extent["ymax"]-data.extent["ymin"],2) +
   Math.pow(data.extent["zmax"]-data.extent["zmin"],2));

  // Scene
  scene = new THREE.Scene();
  scene.position = center;

  camera = new THREE.PerspectiveCamera(
    35,             // Field of view
    800 / 600,      // Aspect ratio
    0.1*radius,     // Near plane
    1000*radius     // Far plane
  );

  function update_camera_position() {
    camera.position.x = focus.x + radius * Math.sin(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180);
    camera.position.y = focus.y + radius * Math.cos(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180);
    camera.position.z = focus.z + radius * Math.sin(phi * Math.PI / 180);
    camera.lookAt(focus);
  }

  update_camera_position();
  camera.up = new THREE.Vector3(0,0,1);

  scene.add(camera);

  // BoundingBox
  boundbox = new THREE.Mesh(
    new THREE.CubeGeometry(
      data.extent["xmax"]-data.extent["xmin"],
      data.extent["ymax"]-data.extent["ymin"],
      data.extent["zmax"]-data.extent["zmin"]),
    new THREE.MeshBasicMaterial({color: 0x666666, wireframe: true})
  );
  boundbox.position = center;
  scene.add(boundbox);  

  // Draw the Axes
  if (data.axes.hasaxes instanceof Array) {
    hasaxes = new Array(data.axes.hasaxes[0], data.axes.hasaxes[1], data.axes.hasaxes[2]);
  } else if (data.axes.hasaxes instanceof Boolean) {
    if (data.axes) {
      hasaxes = new Array(true, true, true);
    } else {
      hasaxes = new Array(false, false, false);
    }
  } else {
    hasaxes = new Array(false, false, false);
  }
  var axesmat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth : 1.2 });
  var axesgeom = new Array;

  if (hasaxes[0]) {
    axesgeom[0] = new THREE.Geometry();
    axesgeom[0].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[0].x + boundbox.position.x,
      boundbox.geometry.vertices[0].y + boundbox.position.y,
      boundbox.geometry.vertices[0].z + boundbox.position.z
    ));
    axesgeom[0].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[5].x + boundbox.position.x,
      boundbox.geometry.vertices[5].y + boundbox.position.y,
      boundbox.geometry.vertices[5].z + boundbox.position.z
    ));
    axesx = new THREE.Line(axesgeom[0], axesmat);
    scene.add(axesx);
  }

  if (hasaxes[1]) {
    axesgeom[1] = new THREE.Geometry();
    axesgeom[1].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[0].x + boundbox.position.x,
      boundbox.geometry.vertices[0].y + boundbox.position.y,
      boundbox.geometry.vertices[0].z + boundbox.position.z
    ));
    axesgeom[1].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[2].x + boundbox.position.x,
      boundbox.geometry.vertices[2].y + boundbox.position.y,
      boundbox.geometry.vertices[2].z + boundbox.position.z
    ));
    axesy = new THREE.Line(axesgeom[1], axesmat);
    scene.add(axesy);
  }

  if (hasaxes[2]) {
    axesgeom[2] = new THREE.Geometry();
    axesgeom[2].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[0].x + boundbox.position.x,
      boundbox.geometry.vertices[0].y + boundbox.position.y,
      boundbox.geometry.vertices[0].z + boundbox.position.z
    ));
    axesgeom[2].vertices.push(new THREE.Vector3(
      boundbox.geometry.vertices[1].x + boundbox.position.x,
      boundbox.geometry.vertices[1].y + boundbox.position.y,
      boundbox.geometry.vertices[1].z + boundbox.position.z
    ));
    axesz = new THREE.Line(axesgeom[2], axesmat);
    scene.add(axesz);
  }

  // Axes Ticks
  var tickmat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth : 1.2 });
  var ticks = new Array(3);
  var ticks_small = new Array(3);
  var ticklength = 0.005*radius;

  for (var i = 0; i < 3; i++) {
    if (hasaxes[i]) {
      ticks[i] = new Array;
      for (var j = 0; j < data.axes.ticks[i][0].length; j++) {
        tickgeom = new THREE.Geometry();
        tickgeom.vertices.push(new THREE.Vector3(0,0,0));
        tickgeom.vertices.push(new THREE.Vector3(0,0,0));
        ticks[i].push(new THREE.Line(tickgeom, tickmat));
        scene.add(ticks[i][j]);

      }
      ticks_small[i] = new Array;
      for (var j = 0; j < data.axes.ticks[i][1].length; j++) {
         tickgeom = new THREE.Geometry();
         tickgeom.vertices.push(new THREE.Vector3(0,0,0));
         tickgeom.vertices.push(new THREE.Vector3(0,0,0));
         ticks_small[i].push(new THREE.Line(tickgeom, tickmat));
         scene.add(ticks_small[i][j]);
      }
    }
  }

  function update_axes() {
    if (hasaxes[0]) {
      for (var j = 0; j < data.axes.ticks[0][0].length; j++) {
        xval = data.axes.ticks[0][0][j];

        ticks[0][j].geometry.vertices[0].x = xval;
        ticks[0][j].geometry.vertices[0].y = axesgeom[0].vertices[0].y;
        ticks[0][j].geometry.vertices[0].z = axesgeom[0].vertices[0].z;

        ticks[0][j].geometry.vertices[1].x = xval;
        ticks[0][j].geometry.vertices[1].y = axesgeom[0].vertices[0].y - ticklength;
        ticks[0][j].geometry.vertices[1].z = axesgeom[0].vertices[0].z;
      }
      for (var j = 0; j < data.axes.ticks[0][1].length; j++) {
        xval = data.axes.ticks[0][1][j];

        ticks_small[0][j].geometry.vertices[0].x = xval;
        ticks_small[0][j].geometry.vertices[0].y = axesgeom[0].vertices[0].y;
        ticks_small[0][j].geometry.vertices[0].z = axesgeom[0].vertices[0].z;

        ticks_small[0][j].geometry.vertices[1].x = xval;
        ticks_small[0][j].geometry.vertices[1].y = axesgeom[0].vertices[0].y - ticklength;
        ticks_small[0][j].geometry.vertices[1].z = axesgeom[0].vertices[0].z;
      }
    }
    if (hasaxes[1]) {
      for (var j = 0; j < data.axes.ticks[1][0].length; j++) {
        yval = data.axes.ticks[1][0][j];

        ticks[1][j].geometry.vertices[0].x = axesgeom[1].vertices[0].x;
        ticks[1][j].geometry.vertices[0].y = yval;
        ticks[1][j].geometry.vertices[0].z = axesgeom[1].vertices[0].z;

        ticks[1][j].geometry.vertices[1].x = axesgeom[1].vertices[0].x - ticklength;
        ticks[1][j].geometry.vertices[1].y = yval;
        ticks[1][j].geometry.vertices[1].z = axesgeom[1].vertices[0].z;
      }
      for (var j = 0; j < data.axes.ticks[1][1].length; j++) {
        yval = data.axes.ticks[1][1][j];

        ticks_small[1][j].geometry.vertices[0].x = axesgeom[1].vertices[0].x;
        ticks_small[1][j].geometry.vertices[0].y = yval;
        ticks_small[1][j].geometry.vertices[0].z = axesgeom[1].vertices[0].z;

        ticks_small[1][j].geometry.vertices[1].x = axesgeom[1].vertices[0].x - ticklength;
        ticks_small[1][j].geometry.vertices[1].y = yval;
        ticks_small[1][j].geometry.vertices[1].z = axesgeom[1].vertices[0].z;
      }
    }
    if (hasaxes[2]) {
      for (var j = 0; j < data.axes.ticks[2][0].length; j++) {
        zval = data.axes.ticks[2][0][j];

        ticks[2][j].geometry.vertices[0].x = axesgeom[2].vertices[0].x;
        ticks[2][j].geometry.vertices[0].y = axesgeom[2].vertices[0].y
        ticks[2][j].geometry.vertices[0].z = zval;

        ticks[2][j].geometry.vertices[1].x = axesgeom[2].vertices[0].x - ticklength;
        ticks[2][j].geometry.vertices[1].y = axesgeom[2].vertices[0].y
        ticks[2][j].geometry.vertices[1].z = zval;
      }
      for (var j = 0; j < data.axes.ticks[2][1].length; j++) {
        zval = data.axes.ticks[2][1][j];

        ticks_small[2][j].geometry.vertices[0].x = axesgeom[2].vertices[0].x;
        ticks_small[2][j].geometry.vertices[0].y = axesgeom[2].vertices[0].y
        ticks_small[2][j].geometry.vertices[0].z = zval;

        ticks_small[2][j].geometry.vertices[1].x = axesgeom[2].vertices[0].x - ticklength;
        ticks_small[2][j].geometry.vertices[1].y = axesgeom[2].vertices[0].y
        ticks_small[2][j].geometry.vertices[1].z = zval;
      }
    }
  }
  update_axes();

  // Axes numbering using divs
  var ticknums = new Array(3);
  for (var i = 0; i < 3; i++) {
    if (hasaxes[i]) {
      ticknums[i] = new Array(data.axes.ticks[i][0].length);
      for (var j = 0; j < ticknums[i].length; j++) {
        ticknums[i][j] = document.createElement('div');
        ticknums[i][j].innerHTML = data.axes.ticks[i][0][j].toString();
        ticknums[i][j].style.position = "absolute";
        container.appendChild(ticknums[i][j]);
      }
    }
  }
  
  function hideticknums() {
    for (var i = 0; i < 3; i++) {
      if (hasaxes[i]) {
        for (var j = 0; j < ticknums[i].length; j++) {
          ticknums[i][j].style.display = "none";
        }
      }
    }
  }

  function showticknums() {
    for (var i = 0; i < 3; i++) {
      if (hasaxes[i]) {
        for (var j = 0; j < ticknums[i].length; j++) {
          ticknums[i][j].style.display = "";
        }
      }
    }
  }

  function positionticknums() {
    for (var i = 0; i < 3; i++) {
      if (hasaxes[i]) {
        for (var j = 0; j < ticknums[i].length; j++) {
          var tickpos = toScreenCoords(ticks[i][j].geometry.vertices[0]);
          var anglex = Math.atan(tickpos.x/tickpos.z);
          var angley = Math.atan(tickpos.y/tickpos.z);

          ticknums[i][j].style.top = (400 * (0.5 + Math.sin(angley) / Math.sin(camera.fov))).toString() + "px";
          ticknums[i][j].style.left = (400 * (0.5 + Math.sin(anglex) / Math.sin(camera.fov))) + "px";
        }
      }
    }
  }

  // Plot the primatives
  for (var indx = 0; indx < data.elements.length; indx++) {
    var type = data.elements[indx].type;
    switch(type) {
      case "point":
        scene.add(drawPoint(data.elements[indx]));
        break
      case "line":
        scene.add(drawLine(data.elements[indx]));
        break;
      case "polygon":
        scene.add(drawPolygon(data.elements[indx]));
        break;
      default:
        alert("Error: Unknown type passed to drawGraphics3D");
    }
  }

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(400, 400);
  container.appendChild(renderer.domElement);

  function render() {
    renderer.render( scene, camera );
  };

  function toScreenCoords(position) {
    var camz = new THREE.Vector3(
        focus.x - camera.position.x,
        focus.y - camera.position.y,
        focus.z - camera.position.z
    );
    camz.normalize();

    var camx = new THREE.Vector3(
        radius * Math.cos(phi * Math.PI / 180) * Math.cos(theta * Math.PI / 180),
        - radius * Math.cos(phi * Math.PI / 180) * Math.sin(theta * Math.PI / 180),
        0
    );
    camx.normalize();

    var camy = new THREE.Vector3();
    camy.cross(camz, camx);

    var campos = new THREE.Vector3(
        position.x - camera.position.x + focus.x,
        position.y - camera.position.y + focus.y,
        position.z - camera.position.z + focus.z
    );

    var cam = new THREE.Vector3(
        camx.dot(campos),
        camy.dot(campos),
        camz.dot(campos)
    );
    
    return cam;
  }

  function ScaleInView() {
    var tmp_fov = 0.0;

    for (var i=0; i<8; i++) {
      proj2d = toScreenCoords(boundbox.geometry.vertices[i]);

      angle = 57.296 * Math.max(
         Math.abs(Math.atan(proj2d.x/proj2d.z)),
         Math.abs(Math.atan(proj2d.y/proj2d.z))
      );
      tmp_fov = Math.max(tmp_fov, 2*angle);
    }

    camera.fov = tmp_fov;
    camera.updateProjectionMatrix();
  }

  // Mouse Interactions
  function onDocumentMouseDown( event ) {
    event.preventDefault();

    isMouseDown = true;
    isShiftDown = false;
    isCtrlDown = false;

    onMouseDownTheta = theta;
    onMouseDownPhi = phi;

    onMouseDownPosition.x = event.clientX;
    onMouseDownPosition.y = event.clientY;

    onMouseDownFocus = new THREE.Vector3(focus.x, focus.y, focus.z);
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    if (isMouseDown) {
      positionticknums();

      if (event.shiftKey) {
        // console.log("Pan");
        if (! isShiftDown) {
          isShiftDown = true;
          onMouseDownPosition.x = event.clientX;
          onMouseDownPosition.y = event.clientY;
          autoRescale = false;
          container.style.cursor = "move";
        }
        var camz = new THREE.Vector3(
            focus.x - camera.position.x,
            focus.y - camera.position.y,
            focus.z - camera.position.z
        );
        camz.normalize();

        var camx = new THREE.Vector3(
            radius * Math.cos(phi * Math.PI / 180) * Math.cos(theta * Math.PI / 180),
            - radius * Math.cos(phi * Math.PI / 180) * Math.sin(theta * Math.PI / 180),
            0
        );
        camx.normalize();

        var camy = new THREE.Vector3();
        camy.cross(camz, camx);

        focus.x = onMouseDownFocus.x + (radius / 400)*(camx.x * (event.clientX - onMouseDownPosition.x) + camy.x * (event.clientY - onMouseDownPosition.y));
        focus.y = onMouseDownFocus.y + (radius / 400)*(camx.y * (event.clientX - onMouseDownPosition.x) + camy.y * (event.clientY - onMouseDownPosition.y));
        focus.z = onMouseDownFocus.z + (radius / 400)*(camx.z * (event.clientX - onMouseDownPosition.x) + camy.z * (event.clientY - onMouseDownPosition.y));

        update_camera_position();

      } else if (event.ctrlKey) {
        // console.log("Zoom");
        if (! isCtrlDown) {
          isCtrlDown = true;
          onCtrlDownFov = camera.fov;
          onMouseDownPosition.x = event.clientX;
          onMouseDownPosition.y = event.clientY;
          autoRescale = false;
          container.style.cursor = "crosshair";
        }
        camera.fov =  onCtrlDownFov + 20 * Math.atan((event.clientY - onMouseDownPosition.y)/50);
        camera.fov = Math.max(1, Math.min(camera.fov, 150));
        camera.updateProjectionMatrix();

      } else {
        // console.log("Spin");
        if (isCtrlDown || isShiftDown) {
          onMouseDownPosition.x = event.clientX;
          onMouseDownPosition.y = event.clientY;
          isShiftDown = false;
          isCtrlDown = false;
          container.style.cursor = "pointer";
        }

        theta = (event.clientX - onMouseDownPosition.x) + onMouseDownTheta;
        phi = (event.clientY - onMouseDownPosition.y) + onMouseDownPhi;
        phi = Math.max(Math.min(90, phi),-90);

        update_camera_position();
      }
      render();

    } else {
        container.style.cursor = "pointer";
    }
  }

  function onDocumentMouseUp(event) {
    event.preventDefault();

    isMouseDown = false;
    container.style.cursor = "pointer";

    if (autoRescale) {
        ScaleInView();
        render();
    }
    positionticknums();
  }

  // Bind Mouse events
  container.addEventListener('mousemove', onDocumentMouseMove, false);
  container.addEventListener('mousedown', onDocumentMouseDown, false);
  container.addEventListener('mouseup', onDocumentMouseUp, false);
  onMouseDownPosition = new THREE.Vector2();
  autoRescale = true;

  update_camera_position();
  ScaleInView();
  positionticknums();
  render();
}