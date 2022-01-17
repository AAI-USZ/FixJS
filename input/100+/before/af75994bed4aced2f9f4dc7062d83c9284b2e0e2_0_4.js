function () { // create vertex arrays for lines
                                    var x, xfrom = index - (index % 20), xto = xfrom + 20, xvertices = [],
                                        z, zfrom = index % 20, zto = 400 - (19 - zfrom), zvertices = [];
                                    for (x = xfrom; x < xto; x++) xvertices.push(object.geometry.vertices[x]);
                                    for (z = zfrom; z < zto; z += 20) zvertices.push(object.geometry.vertices[z]);
                                    xlines = surface.create_line(xvertices);
                                    zlines = surface.create_line(zvertices);
                                    surface_top_group.add(xlines);
                                    surface_top_group.add(zlines);
                                }