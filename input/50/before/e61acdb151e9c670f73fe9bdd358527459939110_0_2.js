function removeElement() {
        $parent.remove()
        $parent.trigger('closed')
      }