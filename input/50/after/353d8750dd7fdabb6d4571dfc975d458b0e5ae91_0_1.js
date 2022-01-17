function(it){
                console.log(it.initData);
                db.Items.attach(it);
                it.Value = 'updated';
            }