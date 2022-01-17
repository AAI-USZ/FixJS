function(x) {
        if (typeof x === 'undefined') return container.innerHTML;
        container.innerHTML = wax.u.sanitize(x);
        return this;
    }