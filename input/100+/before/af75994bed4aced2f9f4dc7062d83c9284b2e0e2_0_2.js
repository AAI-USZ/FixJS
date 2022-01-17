function () { // axis ticks
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        plane = new THREE.PlaneGeometry(100, 5, 0, 0),
                        texture = new THREE.Texture(canvas),
                        material = new THREE.MeshBasicMaterial({map: texture, transparent: true}),
                        axis = new THREE.Mesh(plane, material),
                        labels = util.thin(config.spacing.map(function (val) {return (val + 50) * 5}), nth);
                    canvas.width = 500;
                    canvas.height = 50;
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    for (i = 0; i < labels.length; i++)
                        ctx.moveTo(labels[i] + 0.5, 25), ctx.lineTo(labels[i] + 0.5, 0);
                    ctx.moveTo(0.5, 25.5);
                    ctx.lineTo(0.5, 0.5);
                    ctx.lineTo(499.5, 0.5);
                    ctx.lineTo(499.5, 25.5);
                    ctx.stroke();
                    axis.material.map.needsUpdate = true;
                    axis.doubleSided = true;
                    axis.position.z = 55;
                    mesh.add(axis);
                }