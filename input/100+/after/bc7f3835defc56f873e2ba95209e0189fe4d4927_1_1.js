function createMeshesFromStoryboard (storyboard, w, h)
      {
        var actors = [];
        var animation;

        // 1) Colleziono tutti gli attori
        for (var i in storyboard.segments) {

          var segment = storyboard.segments[i];

          var tmpActors = actors.filter (function (element) {
            return element.id === segment.actor.id;
          });
          if (tmpActors.length === 0) {
            actors.push (segment.actor);
          }
        }

        // 2) Per ogni attore processo tutti i suoi segmenti
        for (var i in actors) {

          var actor = actors[i];

          animation = {
            id : actor.id,
            obj : undefined,
            transitions : [],
            x0 : actor.startingConfiguration.tx,
            y0 : actor.startingConfiguration.ty,
            z0 : actor.startingConfiguration.tz,
            dx : 0, dy : 0, dz : 0,
            rx : 0, ry : 0, rz : 0,
            sx : 1, sy : 1, sz : 1
          };

          if (actor.model === "Camera") {
            var camera = new THREE.PerspectiveCamera (45, w / h, 0.1, 10000);
            camera.lookAt (scene.position);
            animation.obj = camera;
            cameras.push (camera);
          } else if (actor.model === "Cube")
            animation.obj = new THREE.Mesh (new THREE.CubeGeometry (1, 1, 1)); // , new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
          else if (actor.model === "Cylinder")
            animation.obj = new THREE.Mesh (new THREE.CylinderGeometry ());
          else if (actor.model === "Icosahedron")
            animation.obj = new THREE.Mesh (new THREE.IcosahedronGeometry ());
          else if (actor.model === "Octahedron")
            animation.obj = new THREE.Mesh (new THREE.OctahedronGeometry ());
          else if (actor.model === "Plane")
            animation.obj = new THREE.Mesh (new THREE.PlaneGeometry ());
          else if (actor.model === "Sphere")
            animation.obj = new THREE.Mesh (new THREE.SphereGeometry ());
          else if (actor.model === "Tetrahedron")
            animation.obj = new THREE.Mesh (new THREE.TetrahedronGeometry ());
          else if (actor.model === "Torus")
            animation.obj = new THREE.Mesh (new THREE.TorusGeometry ());
          else
            animation.obj = actor.model; // per input da Web3D

          animation.obj.position.set (actor.startingConfiguration.tx,
                                      actor.startingConfiguration.ty,
                                      actor.startingConfiguration.tz);
          animation.obj.rotation.set (actor.startingConfiguration.rx,
                                      actor.startingConfiguration.ry,
                                      actor.startingConfiguration.rz);
          animation.obj.scale.set (actor.startingConfiguration.sx,
                                   actor.startingConfiguration.sy,
                                   actor.startingConfiguration.sz);

          if (actor.model !== "Camera")
            scene.add (animation.obj);

          for (var j in storyboard.segments) {

            var segment = storyboard.segments[j];

            if (segment.actor.id === actor.id) {

              if (segment.behaviour.position !== undefined) {
                animation.transitions.push ({
                  id : segment.id * 10 + 1,
                  t : "translate",
                  t0 : segment.tStart,
                  t1 : segment.duration,
                  dxf : segment.behaviour.position.x,
                  dyf : segment.behaviour.position.y,
                  dzf : segment.behaviour.position.z
                });
              }

              if (segment.behaviour.rotation !== undefined) {
                animation.transitions.push ({
                  id : segment.id * 10 + 2,
                  t : "rotate",
                  t0 : segment.tStart,
                  t1 : segment.duration,
                  dgx : segment.behaviour.rotation.x,
                  dgy : segment.behaviour.rotation.y,
                  dgz : segment.behaviour.rotation.z
                });
              }

              if (segment.behaviour.scale !== undefined) {
                animation.transitions.push ({
                  id : segment.id * 10 + 3,
                  t : "scale",
                  t0 : segment.tStart,
                  t1 : segment.duration,
                  sxf : segment.behaviour.scale.x,
                  syf : segment.behaviour.scale.y,
                  szf : segment.behaviour.scale.z
                });
              }

              if (segment.easing !== undefined) {
                // TODO: da fare
              }

            }

          }

          animations.push (animation);

        }
      }