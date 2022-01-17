function render(fill, w, h, nsubsamples)
{
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {

            var rad = new vec(0.0, 0.0, 0.0);

            // subsampling
            for (var v = 0; v < nsubsamples; v++) {
                for (var u = 0; u < nsubsamples; u++) {
                    var px =  (x + (u / nsubsamples) - (w / 2.0))/(w / 2.0);
                    var py = -(y + (v / nsubsamples) - (h / 2.0))/(h / 2.0);

                    var eye = vnormalize(new vec(px, py, -1.0));

                    var ray = new Ray(new vec(0.0, 0.0, 0.0), eye);

                    var isect = new Isect();
                    spheres[0].intersect(ray, isect);
                    spheres[1].intersect(ray, isect);
                    spheres[2].intersect(ray, isect);
                    plane.intersect(ray, isect);

                    if (isect.hit) {
                            
                        var col = ambient_occlusion(isect);

                        rad.x += col.x;
                        rad.y += col.y;
                        rad.z += col.z;
                    }
                }
            }

            var r = clamp(rad.x / (nsubsamples * nsubsamples));
            var g = clamp(rad.y / (nsubsamples * nsubsamples));
            var b = clamp(rad.z / (nsubsamples * nsubsamples));

            // use fill rect
            fill(x, y, r, g, b);
        }
    }

}