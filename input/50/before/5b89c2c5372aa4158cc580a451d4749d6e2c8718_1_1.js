function closeCollapsibleBlock() {
        if (inCollapsibleBlock) {
            inCollapsibleBlock--;
            closeToFragment("div");
            holder = holder.parentNode;
            // Ensure the user can always edit below the block
            openParagraph();
        }
    }