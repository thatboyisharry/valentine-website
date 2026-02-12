document.addEventListener("DOMContentLoaded", () => {

    /* --- CONFIG & DATA --- */
    const levels = [
        {
            cute: "Let's see if it's really you... Level 1! ✨",
            question: "What is the best City in the world?",
            answer: "pretoria"
        },
        {
            cute: "Only you would know this one... Level 2! 🍳",
            question: "What is Harrison's favourite cooking show?",
            answer: "cooking with p"
        },
        {
            isAd: true,
            text: "Mr Price is a cool store, beloved by many many people in the country. Check them out to see their summer fashion selections at mrp.com"
        },
        {
            cute: "Final test! Level 3! 💎",
            question: "What does the P in MRP stand for?",
            answer: "precious"
        }
    ]

    const gifStages = [
        "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
        "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
        "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
        "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
        "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
        "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
        "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
        "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
    ]

    let currentLevel = 0
    let noClickCount = 0
    let runawayEnabled = false
    let yesTeasedCount = 0
    let musicPlaying = true

    /* --- ELEMENTS --- */
    const quizScreen = document.getElementById("quiz-screen")
    const mainContent = document.getElementById("main-content")
    const levelContent = document.getElementById("level-content")
    const music = document.getElementById("bg-music")

    const catGif = document.getElementById("cat-gif")
    const yesBtn = document.getElementById("yes-btn")
    const noBtn = document.getElementById("no-btn")

    /* --- IDENTITY & QUIZ --- */
    window.rejectUser = () => {
        document.body.innerHTML = `
            <div style="color:white;text-align:center;padding-top:20vh;font-family:Nunito;">
                <h1>My apologies.</h1>
                <p>This site is for Mahlogonolo only. Access terminated.</p>
            </div>`
    }

    window.startQuiz = () => {
        document.getElementById("identity-screen").style.display = "none"
        quizScreen.style.display = "flex"
        renderLevel()
    }

    function renderLevel() {
        const data = levels[currentLevel]

        if (data.isAd) {
            levelContent.innerHTML = `
                <p style="opacity:0.8;font-size:0.9rem;">AD BREAK</p>
                <p>${data.text}</p>
                <button onclick="nextLevel()">Skip Ad & Continue</button>
            `
        } else {
            levelContent.innerHTML = `
                <p class="cute-msg">${data.cute}</p>
                <h3>${data.question}</h3>
                <input id="quiz-input" type="text" autocomplete="off">
                <button onclick="checkAnswer()">Submit</button>
                <p id="quiz-error" style="color:red;"></p>
            `
        }
    }

    window.checkAnswer = () => {
        const input = document.getElementById("quiz-input").value.toLowerCase().trim()
        const error = document.getElementById("quiz-error")

        if (input === levels[currentLevel].answer) {
            nextLevel()
        } else {
            error.textContent = "That's not it! Try again 😅"
        }
    }

    window.nextLevel = () => {
        currentLevel++
        currentLevel < levels.length ? renderLevel() : finishQuiz()
    }

    function finishQuiz() {
        quizScreen.style.display = "none"
        mainContent.style.display = "block"

        music.muted = false
        music.volume = 0.3
        music.play().catch(() => {})
        document.getElementById("music-toggle").textContent = "🔊"
    }

    /* --- VALENTINE LOGIC --- */

    const noMessages = [
        "No 😐",
        "Wait… was that a misclick?",
        "Be honest. You meant Yes, right?",
        "Okay now I'm slightly concerned 🥺",
        "This is getting emotionally dangerous...",
        "My tiny animated heart can't take this 💔",
         "You can't catch me anyway 😜"
    ]

    const yesTeasePokes = [
        "Hmm… try No once 👀",
        "Are you skipping the side quest?",
         "click no, I dare you 😏",
        "Plot twist loading…"
    ]

    // ✅ FIX: expose handlers globally
    window.handleYesClick = () => {
        if (!runawayEnabled) {
            showTeaseMessage(
                yesTeasePokes[Math.min(yesTeasedCount++, yesTeasePokes.length - 1)]
            )
            return
        }
        window.location.href = "yes.html"
    }

    window.handleNoClick = () => {
        noClickCount++

        noBtn.textContent =
            noMessages[Math.min(noClickCount, noMessages.length - 1)]

        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = `${size * 1.3}px`

        swapGif(gifStages[Math.min(noClickCount, gifStages.length - 1)])

        if (noClickCount > 5 && !runawayEnabled) {
            runawayEnabled = true
            enableRunaway()
        }
    }

    function showTeaseMessage(msg) {
        const toast = document.getElementById("tease-toast")
        toast.textContent = msg
        toast.classList.add("show")
        setTimeout(() => toast.classList.remove("show"), 2500)
    }

    function swapGif(src) {
        catGif.style.opacity = "0"
        setTimeout(() => {
            catGif.src = src
            catGif.style.opacity = "1"
        }, 200)
    }

    function enableRunaway() {
        noBtn.addEventListener("mouseover", runAway)
        noBtn.addEventListener("touchstart", runAway)
    }

    function runAway() {
        const maxX = window.innerWidth - noBtn.offsetWidth
        const maxY = window.innerHeight - noBtn.offsetHeight

        noBtn.style.position = "fixed"
        noBtn.style.left = Math.random() * maxX + "px"
        noBtn.style.top = Math.random() * maxY + "px"
    }

    /* --- MUSIC TOGGLE --- */
    window.toggleMusic = () => {
        musicPlaying ? music.pause() : music.play()
        musicPlaying = !musicPlaying
        document.getElementById("music-toggle").textContent =
            musicPlaying ? "🔊" : "🔇"
    }
})
