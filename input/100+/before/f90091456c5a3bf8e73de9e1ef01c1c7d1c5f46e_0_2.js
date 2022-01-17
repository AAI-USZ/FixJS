function (time) {
        var t = time * this._times;
        if (t > this._total + 1) {
            this._innerAction.update(1);
            this._total++;
            this._innerAction.stop();
            this._innerAction.startWithTarget(this._target);

            // repeat is over?
            if (this._total == this._times) {
                // so, set it in the original position
                this._innerAction.update(0);
            }
            else {
                // no ? start next repeat with the right update
                // to prevent jerk (issue #390)
                this._innerAction.update(t - this._total);
            }
        }
        else {
            var r = t % 1;

            // fix last repeat position
            // else it could be 0.
            if (time == 1) {
                r = 1;
                this._total++; // this is the added line
            }

            //		other->update(min(r, 1));
            this._innerAction.update((r > 1) ? 1 : r);
        }
    }