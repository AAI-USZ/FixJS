function() {
            var el = document.createElement('div');
            el.classList.add('montage-Popup-modal-mask');
            el.style.zIndex = 6999;
            el.classList.add('montage-invisible');

            document.body.appendChild(el);
            return el;
        }