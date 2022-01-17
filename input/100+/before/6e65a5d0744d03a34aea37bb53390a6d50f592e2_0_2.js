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

  var camera, scene, renderer, axes,
    isMouseDown = false, onMouseDownPosition, radius,
    tmpx, tmpy, tmpz, 
    theta = 45, onMouseDownTheta = 45, phi = 60, onMouseDownPhi = 60;

  var center = new THREE.Vector3(
    0.5*(data.extent["xmin"] + data.extent["xmax"]),
    0.5*(data.extent["ymin"] + data.extent["ymax"]), 
    0.5*(data.extent["zmin"] + data.extent["zmax"]));

  radius = 2*Math.sqrt(
   Math.pow(data.extent["xmax"]-data.extent["xmin"],2) +
   Math.pow(data.extent["ymax"]-data.extent["ymin"],2) +
   Math.pow(data.extent["zmax"]-data.extent["zmin"],2));

  // Scene
  scene = new THREE.Scene();
  scene.position = center;

  // Camera - TODO: Handle Different choices
  /*
  camera = new THREE.OrthographicCamera(
    data.extent["xmin"], data.extent["xmax"],
    data.extent["ymin"], data.extent["ymax"],
    0.1, 2*radius
  );
  */

  camera = new THREE.PerspectiveCamera(
    35,             // Field of view
    800 / 600,      // Aspect ratio
    0.1*radius,     // Near plane
    1000*radius     // Far plane
  );

  camera.position.x = center.x + radius * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
  camera.position.z = center.y + radius * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
  camera.position.y = center.z + radius * Math.sin(phi * Math.PI / 360);
  camera.up = new THREE.Vector3(0,0,1);
  camera.lookAt(scene.position);
  scene.add(camera);

  // Axes
  axes = new THREE.Mesh(
    new THREE.CubeGeometry(
      data.extent["xmax"]-data.extent["xmin"],
      data.extent["ymax"]-data.extent["ymin"],
      data.extent["zmax"]-data.extent["zmin"]),
    new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true})
  );
  axes.position = center;
  scene.add(axes);  

  // Plot the primatives
  for (var indx = 0; indx < data.elements.length; indx++) {
    var type = data.elements[indx].type;
    switch(type) {
      case "polygon":
        scene.add(drawPolygon(data.elements[indx]));
        break;
      case "plot3d":
        scene.add(drawPlot3D(data.elements[indx]));
        break;
      case "line":
        scene.add(drawLine(data.elements[indx]));
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

  function toScreenXY(position, camera) {
    var pos = position.clone();
    var projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
    projScreenMat.multiplyVector3(pos);

    return pos;
  }

  function ScaleInView() {
    if (camera instanceof THREE.OrthographicCamera) {
      //
    } else if (camera instanceof THREE.PerspectiveCamera) {
      var tmp_fov = 0.0;
    }

    for (var i=0; i<8; i++) {
      proj2d = toScreenXY(axes.geometry.vertices[i],camera);

      if (camera instanceof THREE.OrthographicCamera) {
        //
      } else if (camera instanceof THREE.PerspectiveCamera) {
        angle = 57.296 * Math.max(Math.atan(proj2d.x/proj2d.z), Math.atan(proj2d.y/proj2d.z));
        tmp_fov = Math.max(tmp_fov, angle);
      }
    }

    if (camera instanceof THREE.OrthographicCamera) {
      //
    } else if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = tmp_fov;
    }

    camera.updateProjectionMatrix();
  }

  // Mouse Interactions
  function onDocumentMouseDown( event ) {
    event.preventDefault();

    isMouseDown = true;

    onMouseDownTheta = theta;
    onMouseDownPhi = phi;
    onMouseDownPosition.x = event.clientX;
    onMouseDownPosition.y = event.clientY;
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    if (isMouseDown) {
      theta = (event.clientX - onMouseDownPosition.x) + onMouseDownTheta;
      phi = (event.clientY - onMouseDownPosition.y) + onMouseDownPhi;

      phi = Math.max(Math.min(180, phi),-180);

      camera.position.x = center.x + radius * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
      camera.position.y = center.y + radius * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
      camera.position.z = center.z + radius * Math.sin(phi * Math.PI / 360);
      camera.lookAt(scene.position);

      if (camera instanceof THREE.OrthographicCamera) {
        camera.updateProjectionMatrix();
      } else if (camera instanceof THREE.PerspectiveCamera) {
        camera.updateMatrix();
      }

      render();
     }
  }

  function onDocumentMouseUp(event) {
    event.preventDefault();

    isMouseDown = false;

    onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
    onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;

    ScaleInView();
    render();
  }

  function onDocumentMouseWheel( event ) {
    if (camera instanceof THREE.OrthographicCamera) {
      if (event.wheelDeltaY > 0) {
        camera.left += 0.1;
        camera.right -= 0.1;
        camera.bottom += 0.1;
        camera.top -= 0.1;
      } else {
        camera.left -= 0.1;
        camera.right += 0.1;
        camera.bottom -= 0.1;
        camera.top += 0.1;
      }

      if (camera.right <= 0 || camera.top <= 0) {
        camera.right = 0.1;
        camera.left = -0.1;
        camera.top = 0.1;
        camera.bottom = -0.1;
      }
    } else if (camera instanceof THREE.PerspectiveCamera) {
      if (event.wheelDeltaY > 0) {
        camera.fov *= 0.8;
      } else {
        camera.fov /= 0.8;
      }
      camera.fov = Math.max(1, Math.min(camera.fov, 150));
    }
    camera.updateProjectionMatrix();
    render();
  }

  // Bind Mouse events
  container.addEventListener('mousemove', onDocumentMouseMove, false);
  container.addEventListener('mousedown', onDocumentMouseDown, false);
  container.addEventListener('mouseup', onDocumentMouseUp, false);
  container.addEventListener('mousewheel', onDocumentMouseWheel, false);
  onMouseDownPosition = new THREE.Vector2();

  ScaleInView();
  render();
}