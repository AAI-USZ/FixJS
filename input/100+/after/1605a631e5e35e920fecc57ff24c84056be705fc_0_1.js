function () {

            if (!this.shouldOpen()) return false;

            window.setTimeout(this.bind(this.opening), 1);

            return true;
        }