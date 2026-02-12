let musicPlaying = false;

window.addEventListener("load", () => {
    launchConfetti();

    const music = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("music-toggle");
    const celebrateBtn = document.getElementById("confetti-btn");

    if (music) {
        music.volume = 0.7;
        music.play().then(() => {
            musicPlaying = true;
        }).catch(() => {
            if (toggleBtn) toggleBtn.textContent = "🔇";
        });
    }

    if (toggleBtn) toggleBtn.addEventListener("click", () => {
        if (musicPlaying) {
            music.pause();
            toggleBtn.textContent = "🔇";
        } else {
            music.play();
            toggleBtn.textContent = "🔊";
        }
        musicPlaying = !musicPlaying;
    });

    if (celebrateBtn) {
        celebrateBtn.addEventListener("click", () => {
            launchConfetti();
            celebrateBtn.style.transform = "scale(0.95)";
            setTimeout(() => celebrateBtn.style.transform = "scale(1)", 100);
        });
    }
});

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff69b4", "#ff1493", "#ff85a2", "#ffffff"]
    });
}