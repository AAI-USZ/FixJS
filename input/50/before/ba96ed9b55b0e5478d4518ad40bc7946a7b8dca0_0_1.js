function(result) {
                alert(result.state);
                $('span', $this.parent()).text(result.state)
                               .removeClass()
                               .addClass(data.status);
        }