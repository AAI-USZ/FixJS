function () { // axis label
                    var label = new Text(config.label);
                    label.scale.set(scale, scale, scale);
                    label.position.x = -47;
                    label.position.y = 1;
                    label.position.z = 63;
                    mesh.add(label);
                }