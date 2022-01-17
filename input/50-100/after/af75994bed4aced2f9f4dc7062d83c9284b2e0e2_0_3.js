function (points) {
                var path = new THREE.SplineCurve3(points),
                    tube = new THREE.TubeGeometry(path, points.length, 0.2, 10, false, false);
                return new THREE.Mesh(tube,
                    new THREE.MeshBasicMaterial({color: settings.interactive_color, wireframe: false}));
            }