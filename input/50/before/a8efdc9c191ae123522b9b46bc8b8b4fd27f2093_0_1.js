function(x, limit) {
                x = ~~(
                    Math.min(limit.right - limit.left, Math.max(0, x))
                ); // ~~ uses bitwise conversion as fast parseInt

                return x;
            }