function(e) {
                var $this = $(this),
                    action = $this.data('action');
                if (!action) return;
                e.stopPropagation();
                e.preventDefault();
                var $review = $this.closest('.review');
                switch (action) {
                    case 'delete':
                        deleteReview($review, $this.attr('href'));
                        break;
                    case 'edit':
                        editReview($review);
                        break;
                    case 'report':
                        flagReview($review);
                        break;
                    case 'reply':
                        replyReview($review, $this.attr('href'));
                        break;
                }
            }