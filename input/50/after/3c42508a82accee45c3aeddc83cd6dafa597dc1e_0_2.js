function() {
        views.carddetail.render(this.card);
        return changePage('#card-detail', {
          transition: 'pop'
        });
      }