function(ul) {
        var icon = document.createElement('span')
        icon.className = 'sm-strike'
        icon.textContent = '✘'

        var unstrike = document.createElement('span')
        unstrike.className = 'unstrike'
        unstrike.title = 'Undo strike'
        unstrike.textContent = 'Striked'

        var strike = document.createElement('span')
        strike.className = 'strike'
        strike.title = strike.textContent = 'Strike'

        var b = document.createElement('b')
        b.appendChild(unstrike)
        b.appendChild(strike)

        var a = document.createElement('a')
        a.className = 'with-icn js-toggle-strike'
        a.href = '#'
        a.appendChild(icon)
        a.appendChild(b)

        var li = document.createElement('li')
        li.className = 'action-strike-container'
        li.appendChild(a)

        ul.appendChild(li)
    }