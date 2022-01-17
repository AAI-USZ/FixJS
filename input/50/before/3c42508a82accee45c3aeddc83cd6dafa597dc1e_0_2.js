function() {
        console.log('CardListView#render_card');
        current.carddetailview.render(this.card);
        return changePage('#card-detail', {
          transition: 'flip'
        });
      }