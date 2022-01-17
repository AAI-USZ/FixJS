function() {
   var ITEMS = [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5];
   var heap = new BinaryHeap(function(x){return x;});

   ITEMS.forEach(function(item) {
      heap.push(item);
   });

   //raises(function() { heap.remove(88); });
   strictEqual(heap.remove(2), undefined);
   strictEqual(heap.remove(2), undefined);
   //raises(function() { heap.remove(2); });
}