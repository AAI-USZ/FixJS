function () { // create vertex arrays for lines
                                    // [xz]from & [xz]to are the start and end vertex indexes for a vertex row or column
                                    var x,
                                        xfrom       = index - (index % (x_segments + 1)),
                                        xto         = xfrom + x_segments + 1,
                                        xvertices   = [],
                                        z,
                                        zfrom       = index % (x_segments + 1),
                                        zto         = ((x_segments + 1) * (y_segments + 1)) - (x_segments - zfrom),
                                        zvertices   = [];
                                    for (x = xfrom; x < xto; x++) xvertices.push(object.geometry.vertices[x]);
                                    for (z = zfrom; z < zto; z += x_segments + 1)
                                        zvertices.push(object.geometry.vertices[z]);
                                    surface_top_group.add(xlines = surface.create_line(xvertices));
                                    surface_top_group.add(zlines = surface.create_line(zvertices));
                                }