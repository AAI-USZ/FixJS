function(e) {
        mozmarket.receipts.verify(
            function(result) {
                $('span', $this.parent()).text(result.state)
                               .removeClass()
                               .addClass(data.status);
        });
    }