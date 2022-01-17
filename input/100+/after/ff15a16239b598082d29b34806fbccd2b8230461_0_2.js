function (lo, hi, tol) {
        var a, answer, b, buffer, c, d, f_a, f_b, f_c, f_s, initHi, initLo, loops, mflag, s, tolerance;

        tolerance = typeof tol !== 'undefined' ? tol : 0.000001;

        // (b)
        initHi = this.evaluate(hi);
        // (c)
        initLo = this.evaluate(lo);
        // (d)
        if ((initHi * initLo >= 0)) {
            alert('Range provided does not bracket a unique zero, attempting to recover...');
            return this.biSoln(lo, hi);
        }
        // (e)
        a = lo;
        b = hi;
        if (Math.abs(initLo)  <  Math.abs(initHi)) {
            a = hi;
            b = lo;
        }
        // (f)
        c = a;
        // (g)
        mflag = 1;

        // (h)
        f_a = this.evaluate(a);
        f_b = this.evaluate(b);
        f_c = this.evaluate(c);
        s = b - f_b * (b - a) / (f_b - f_a);
        f_s = this.evaluate(s);
        d = 0;
        buffer = 0;
        loops = 0;
        while (f_b !== 0 && f_s !== 0 && Math.abs(b - a) > tolerance) {
            loops++;
            f_a = this.evaluate(a);
            f_b = this.evaluate(b);
            f_c = this.evaluate(c);

            // (h_i)
            if (f_a !== f_c && f_b !== f_c) {
                // (h_i_1)
                s = a * f_b * f_c / (f_a - f_b) / (f_a - f_c)  +  b * f_a * f_c / (f_b - f_a) / (f_b - f_c)  +  c * f_a * f_b / (f_c - f_a) / (f_c - f_b);
            } else { //(h_ii)
                // (h_ii_1)
                s = b - f_b * (b - a) / (f_b - f_a);
            }
            // (h_iii)
            // (h_iv)
            if (((s > b && s > (3 * a + b) / 4) || (s < b && s < (3 * a + b) / 4)) || (mflag === 1 && Math.abs(s - b)  >=  Math.abs(b - c) / 2) || (mflag === 0 && Math.abs(s - b)  >=  Math.abs(c - d) / 2) || (mflag === 1 && Math.abs(b - c) < tolerance) || (mflag === 0 && Math.abs(c - d) < tolerance)) {
                // (h_iv_1)
                s = (a + b) / 2;
                // (h_iv_2)
                mflag = 1;
            } else { //(h_v)
                // (h_v_1)
                mflag = 0;
            }
            // (h_vi)
            // (h_vii)
            f_s = this.evaluate(s);
            // (h_viii)        
            d = c;
            // (h_ix)
            c = b;
            // (h_x)
            if (f_a * f_s < 0) {
                b = s;
            } else {
                a = s;
            }
            // (h_xi)
            if (Math.abs(this.evaluate(a))  <  Math.abs(this.evaluate(b))) {
                buffer = a;
                a = b;
                b = buffer;
            }
        }

        // (i)
        if (this.evaluate(b) === 0) {
            answer = Math.round(b / tolerance) * tolerance;
        } else {
            answer = Math.round(s / tolerance) * tolerance;
        }

        return answer;
    }