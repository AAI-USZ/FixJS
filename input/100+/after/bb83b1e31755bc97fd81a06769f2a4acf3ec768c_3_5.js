function (event) {
                    if (event.target == this) {
                        $(selectedPhoto).removeClass('selected');
                        selectedPhoto = null;  
                    }
                }