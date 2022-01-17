function(result) {
                $('span', $this.parent()).text(result.state)
                               .removeClass()
                               .addClass(result.state.toLowerCase());
        }