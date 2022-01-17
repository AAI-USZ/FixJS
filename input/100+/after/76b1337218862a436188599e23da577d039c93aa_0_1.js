function(code) {
        switch (code) {
        case 0x8CD6:
            osg.debug("FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
            break;
        case 0x8CD7:
            osg.debug("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            break;
        case 0x8CD9:
            osg.debug("FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            break;
        case 0x8CDD:
            osg.debug("FRAMEBUFFER_UNSUPPORTED");
            break;
        default:
            osg.debug("FRAMEBUFFER unknown error " + code.toString(16));
        }
    }