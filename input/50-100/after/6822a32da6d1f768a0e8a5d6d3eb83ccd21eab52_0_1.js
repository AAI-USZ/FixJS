function setSlide(slideData) {
        setLayout(slideData.getLayout());
        udpateBackground();
        $.each(itemMap, function (name, item) {
            setItem(name);
        });
    }