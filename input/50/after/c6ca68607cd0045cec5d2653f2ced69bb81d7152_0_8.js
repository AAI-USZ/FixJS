function(map) {
        a = document.createElement('a');
        a.className = 'map-fullscreen';
        a.href = '#fullscreen';
        a.innerHTML = 'fullscreen';
        bean.add(a, 'click', click);
        return this;
    }