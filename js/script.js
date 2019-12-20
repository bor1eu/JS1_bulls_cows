// быки-коровы в ООП
//игрок пытается отгадать число, загаданное компьютером
// 10 ходов
// цифры не могут повторяться (1234 + ///// 1122 -)

// 1234 было загадано, то
// 0123 - 3 коровы
// 1789 - 1 бык
// 1458 - 1 бык 1 корова

let puzzle = {
    number: [],
    user: [0, 0, 0, 0],
    rounds: 10,
    mainContainer: '.main-block',
    guessContainer: '.guess-digit',
    historyContainer: '.history',
    _init () {
        this.number = this.getNumber ()
        this._handleEvents ()
        this.showNum ([0,0,0,0])
    },
    newGame () {
        this.number = this.getNumber ()
        this.rounds = 10
        document.querySelector ('.try-btn').innerText = 'Try! ('+ (--this.rounds) + ')'
        this.clearHistory (this.historyContainer + '.left')
        this.clearHistory (this.historyContainer + '.right')
        this.showNum ([0,0,0,0])
        this.removeClassName ('.try-btn', 'invisible')
        this.removeClassName ('.lose', 'lose')
        this.removeClassName ('.win', 'win')
        this.addClassName ('.popup', 'invisible')
        this.addClassName ('.red-eyes', 'invisible')
    },
    _handleEvents () {
        document.querySelector (this.mainContainer).addEventListener ('click', (evt) => {
            if (evt.target.name === 'guess-submit') {
                puzzle.user.forEach ((el, index) => {
                    puzzle.user [index] = +document.querySelectorAll (puzzle.guessContainer) [index].innerText
                })
                puzzle.match (puzzle.user, puzzle.number)
            }
            if (evt.target.name === 'popup-btn') {
                this.newGame ()
            }
        })
        document.querySelector (this.mainContainer).addEventListener ('mousewheel', (evt) => {
            if (evt.target.className === 'guess-digit') {
                if (evt.deltaY == -100) {
                    (+evt.target.innerText === 9) ? evt.target.innerText = 0 : ++evt.target.innerText
                }
                if (evt.deltaY == +100) {
                    (+evt.target.innerText === 0) ? evt.target.innerText = 9 : --evt.target.innerText
                }
            }
        })
    },
    getNumber () {
        let arr = []
        while (arr.length < 4) {
            let num = this.randomize()
            if (arr.indexOf (num) === -1) {
                arr.push (num)
            }
        }
        return arr
    },
    randomize () {
        return Math.floor (Math.random () * 10)
    },
    createHistory (guess, cows, bulls) {
        return `<p class="history-entry">
                    <span>${guess.join ("")}</span>
                    <span>${cows}<img src="img/cow.svg" alt="cows" width="32" height="30"></span>
                    <span>${bulls}<img src="img/bull.svg" alt="bulls" width="32" height="30"></span>
                </p>`
    },
    pushHistory (selector, str, rounds) {
        if (rounds > 5) {
            document.querySelector (selector + '.left').insertAdjacentHTML ("beforeend", str)
        } else {
            document.querySelector (selector + '.right').insertAdjacentHTML ("beforeend", str)
        }
    },
    clearHistory (selector) {
        document.querySelector (selector).innerHTML = ''
    },
    showNum (number) {
        targetContainer = document.querySelectorAll (this.guessContainer)
        number.forEach ((el, index) => {
            targetContainer [index].innerText = el
        })
    },
    addClassName (selector, newClass) {
        document.querySelectorAll (selector).forEach (el => {
            el.classList.add (newClass)
        })
    },
    removeClassName (selector, exClass) {
        document.querySelectorAll (selector).forEach (el => {
            el.classList.remove (exClass)
        })
    },
    match (guess, answer) {
        let bulls = 0;
        let cows = 0;
        guess.forEach (function (num, index) {
            if (+num === answer [index]) {
                bulls ++
            } else if (answer.indexOf (+num) >= 0) {
                cows ++
            }
        })

        this.playing = (bulls < 4) ? true : false
        this.pushHistory (this.historyContainer, this.createHistory (guess, cows, bulls), this.rounds)
        if (this.rounds === 2) {
            this.removeClassName ('.red-eyes', 'invisible')
        }
        document.querySelector ('.try-btn').innerText = 'Try! ('+ (--this.rounds) + ')'
        if (!this.playing || (this.rounds === 0)) this.gameOver ()
    },
    gameOver () {
        if (this.playing) {
            this.addClassName (this.guessContainer, 'lose')
            document.querySelector ('.popup-text').innerText = 'You lose!'
            this.showNum (this.number)
        } else {
            this.addClassName (this.guessContainer, 'win')
            document.querySelector ('.popup-text').innerText = 'You win!'
        }
        this.removeClassName ('.popup', 'invisible')
        this.addClassName ('.try-btn', 'invisible')
    },
    playing: true
}

puzzle._init ()


