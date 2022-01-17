function() {
        container = document.createElement('div');
        container.className = 'map-legends';

        element = container.appendChild(document.createElement('div'));
        element.className = 'map-legend';
        element.style.display = 'none';
        return legend;
    }