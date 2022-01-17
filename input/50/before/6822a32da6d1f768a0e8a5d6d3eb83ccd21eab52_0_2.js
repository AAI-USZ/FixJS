function setSlide(slideData) {
        setLayout(slideData.getLayout());
        $.each(itemMap, function (name, item) {
            setItem(name);
        });
    }