function onMouseUp(event) {
        contactDetails.classList.add('up');
        cover.classList.add('up');
        contactDetails.style.transform = 'translateY(' + initMargin + ')';
        cover.style.backgroundPosition = 'center -' + photoPos + 'rem';
        cover.removeEventListener('mousemove', onMouseMove);
        cover.removeEventListener('mouseup', onMouseUp);
      }