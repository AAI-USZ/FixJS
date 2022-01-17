function(event) {
        switch(event.button) {
        case this.ROTATE:
            this.m_beginOrientation = quat4.create(this.m_orientation);
            this.m_beginDirection = this.pointOnUnitSphere(event.x, event.y);
            this.m_state = this.ROTATE;
            break;
        }
        print(event.x + ", " + event.y);
    }