function(page_number) {
      if (page_number == null) {
        return this.page_number;
      }
      var page_count = $('.NB-page', this.$modal).length;
      this.page_number = page_number;
      
      if (page_number == page_count) {
        $('.NB-tutorial-next-page-text', this.$modal).text('Finish Tutorial ');
      } else if (page_number > page_count) {
        return this.close();
      } else {
        $('.NB-tutorial-next-page-text', this.$modal).text('Next Page ');
      }
      $('.NB-page-previous', this.$modal).toggle(page_number != 1);
      $('.NB-page', this.$modal).css({'display': 'none'});
      $('.NB-page-'+this.page_number, this.$modal).css({'display': 'block'});
      $('.NB-modal-page', this.$modal).html($.make('div', [
        'Page ',
        $.make('b', this.page_number),
        ' of ',
        $.make('b', page_count)
      ]));
      this.set_title();
    }