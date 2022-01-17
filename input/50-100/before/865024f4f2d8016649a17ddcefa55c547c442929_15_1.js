function() {
            var el = document.createElement('div');
            el.classList.add('montage-popup-modal-mask');
            el.style.zIndex = 6999;
            el.classList.add('montage-invisible');

            document.body.appendChild(el);
            return el;
        }