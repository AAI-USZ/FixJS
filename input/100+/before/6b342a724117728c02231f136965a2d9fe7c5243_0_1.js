function() {
        $(this).load(function() {
            var folds = (this.className.match(/\bfolds-(\d+)/)||[9]).pop(),
                container = document.createElement('span'),
                parent = this.parentNode,
                width = this.width,
                sectionWidth = width / (folds+1),
                angle = 8 * Math.PI/180,
                scale = 1 / Math.cos(angle);

            container.className = 'folded-container';

            for (var i = 0; i <= folds; ++i) {
                var section = document.createElement('span'),
                    img = document.createElement('img'),
                    down = i % 2;

                img.src = this.src;
                img.style.marginLeft = (-i * sectionWidth) + 'px';

                section.className = [
                    'section',
                    i ? (i < folds ? 'mid' : 'last') : 'first',
                    down ? 'outer' : 'inner'
                ].join(' ');
                section.style.width = sectionWidth + 'px';
                section.style.WebkitTransform = 'perspective(1000px) scaleX(' + scale + ') skewY(' + (down ? '' : '-') + angle + 'rad)';
                section.style.MozTransform = 'perspective(1000px) scaleX(' + scale + ') skewY(' + (down ? '' : '-') + angle + 'rad)';
                section.style.MsTransform = 'perspective(1000px) scaleX(' + scale + ') skewY(' + (down ? '' : '-') + angle + 'rad)';
                section.style.OTransform = 'perspective(1000px) scaleX(' + scale + ') skewY(' + (down ? '' : '-') + angle + 'rad)';
                section.style.transform = 'perspective(1000px) scaleX(' + scale + ') skewY(' + (down ? '' : '-') + angle + 'rad)';
                section.appendChild(img);

                container.appendChild(section);
            }

            parent.removeChild(this);
            parent.appendChild(container);
        });
    }