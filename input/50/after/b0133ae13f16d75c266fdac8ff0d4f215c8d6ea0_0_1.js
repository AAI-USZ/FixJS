function (y) {
            return pad_t + (y_max - y) * (hei - pad_t - pad_b) / (y_max - y_min == 0? 1: y_max - y_min);
        }