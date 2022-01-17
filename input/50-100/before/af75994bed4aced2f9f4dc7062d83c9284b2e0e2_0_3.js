function (points) {
                var path = new THREE.SplineCurve3(points),
                    tube = new THREE.TubeGeometry(path, 20, 0.2, 10, false, true); // path, segments, radius, segmentsRadius, closed, debug
                return new THREE.Mesh(tube, new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false}));
            }