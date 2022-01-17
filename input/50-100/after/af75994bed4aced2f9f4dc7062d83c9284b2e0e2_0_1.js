function () { // axis values
                    var value;
                    for (i = 0; i < lbl_arr.length; i++) {
                        value = new Text(lbl_arr[i]);
                        value.scale.set(scale, scale, scale);
                        value.position.x = pos_arr[i];
                        value.position.y = 1;
                        value.position.z = (other_axis_len / 2) + 8;
                        mesh.add(value);
                    }
                }