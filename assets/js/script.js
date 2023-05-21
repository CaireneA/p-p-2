// A timer object
const timer = {
    totalSeconds: 0,
    remainingSeconds: 0,
    timerInterval: null,

    /**
     * Reads the input values for hours, minutes, and seconds, and
     * calculates the total time in seconds.
     */
    getTimeInput() {
        let hours = document.getElementById('hours').value;
        let minutes = document.getElementById('minutes').value;
        let seconds = document.getElementById('seconds').value;

        this.totalSeconds = hours * 3600 + minutes * 60 + Number(seconds);
        this.remainingSeconds = this.totalSeconds;
    },

    /**
     * Displays the current remaining time in HH:MM:SS format.
     * Also changes the color based on the remaining time.
     */
    displayTime() {
        let hours = Math.floor(this.remainingSeconds / 3600);
        let minutes = Math.floor((this.remainingSeconds % 3600) / 60);
        let seconds = this.remainingSeconds % 60;

        document.getElementById('timer-placeholder').innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Color changes based on the remaining time.
        if (this.remainingSeconds <= this.totalSeconds * 0.1 && this.remainingSeconds > 10) {
            document.getElementById('timer-placeholder').style.color = "yellow";
        } else if (this.remainingSeconds <= 10) {
            document.getElementById('timer-placeholder').style.color = "red";
        } else {
            document.getElementById('timer-placeholder').style.color = "#F0EEE9";
        }
    },


    /**
     * Starts the timer countdown.
     */
    runTimer() {
        // Clears any existing interval to avoid stacking intervals.
        clearInterval(this.timerInterval);

        // Sets up a new interval that counts down every second.
        this.timerInterval = setInterval(() => {
            this.remainingSeconds -= 1;
            this.displayTime();

            // When time's up, clear interval and alert the user.
            if (this.remainingSeconds <= 0) {
                clearInterval(this.timerInterval);
                alert("Timer finished!");
            }
        }, 1000);
    },

    /**
     * Pauses the timer by clearing the interval.
     */
    pauseTimer() {
        clearInterval(this.timerInterval);
    },

    /**
     * Resets the timer to the originally set time.
     */
    resetTimer() {
        clearInterval(this.timerInterval);
        this.remainingSeconds = 0;
        this.totalSeconds = 0;
        this.displayTime();
    },


}

document.addEventListener('DOMContentLoaded', function () {
    // Start button starts the timer.
    document.querySelector("[data-type='start']").addEventListener("click", function () {
        timer.getTimeInput();
        timer.runTimer();

        // Reset the input values to 0 after timer starts
        document.getElementById('hours').value = 0;
        document.getElementById('minutes').value = 0;
        document.getElementById('seconds').value = 0;
    });

    // Pause button pauses the timer.
    document.querySelector("[data-type='pause']").addEventListener("click", function () {
        timer.pauseTimer();
    });

    // Play button resumes the timer.
    document.querySelector("[data-type='play']").addEventListener("click", function () {
        timer.runTimer();

        // Reset button resets the timer.
        document.querySelector("[data-type='reset']").addEventListener("click", function () {
            timer.resetTimer();
        });
    });
})