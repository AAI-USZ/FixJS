function () { // axis label
                    var label = new Text(config.label);
                    label.scale.set(scale, scale, scale);
                    label.position.x = -(axis_len / 2) + 4;
                    label.position.y = 1;
                    label.position.z = (other_axis_len / 2) + 13;
                    mesh.add(label);
                }