function calcMinimumSize(element, dir) {
     var DC = DirConfig[dir];

     if (element.style.display == 'none'
	 || element.style.visibility == 'hidden')
       return 0;
     else {
       if (element['layoutMin' + DC.Size])
	 return element['layoutMin' + DC.Size];
       else {
	 var result = WT.px(element, 'min' + DC.Size);

	 if (!WT.boxSizing(element))
	   result += WT.px(element, 'padding' + DC.Left) +
	     WT.px(element, 'padding' + DC.Right);

	 return result;
       }
     }
   }