function(x, limit) {
                x = ~~(
                    Math.min(limit.right, Math.max(limit.left, x))
                ); // ~~ uses bitwise conversion as fast parseInt

                return x;
            }