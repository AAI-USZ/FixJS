function(e) {
            // Destroy all active states
            el.getElementsByClassName('active')[0].classList.remove('active');

            // Add correct active states
            if (this.nextSibling) {
                this.nextSibling.classList.add('active');
            } else {
                this.previousSibling.classList.add('active');
            }
            
            e.preventDefault();
        }