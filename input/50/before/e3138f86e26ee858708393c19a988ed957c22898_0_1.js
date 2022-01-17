function(id) {
        setCanvasIdCSS(id);
        pixelBufferOne = m_context.createImageData(width, height - 1);
        pixelBufferTwo = m_context.createImageData(width, height - 1);
        populateRules();
        reset();
        initMask();
    }