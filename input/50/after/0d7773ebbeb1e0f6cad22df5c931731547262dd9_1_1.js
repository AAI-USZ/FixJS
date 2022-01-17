function(){

                if(CKEDITOR.instances['article-content']){
                    CKEDITOR.instances['article-content'].destroy(true);
                }
                CKEDITOR.replace('article-content', {
                    customConfig : ''
                });
            }