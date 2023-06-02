// A timer object
const timer = {
    totalSeconds: 0,
    remainingSeconds: 0,
    timerInterval: null,
    paused: false,
    isActive: false,


    /**
     * Handles the key press event for Enter key.
     * Starts the timer when Enter key is pressed.
     */
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            timer.getTimeInput();
            timer.runTimer();

            // Reset the input values to 0 after timer starts
            document.getElementById('hours').value = 0;
            document.getElementById('minutes').value = 0;
            document.getElementById('seconds').value = 0;
        }
    },


/**
 * Adds leading zero if necessary and checks if the input is valid
 */
checkAndPadInput(inputElement) {
    let isValid = true;

    // Iterate through each character in the input
    for (let i = 0; i < inputElement.value.length; i++) {
        let ascii = inputElement.value.charCodeAt(i);

        // If ASCII value is not within the range for numbers (48-57), mark as invalid
        if (ascii < 48 || ascii > 57) {
            isValid = false;
            break;
        }
    }

    // If input is not a valid number, alert the user
    if (!isValid) {
        alert(`Please enter a valid number for ${inputElement.id}.`);
        inputElement.value = inputElement.placeholder;
    } else if (!inputElement.value) {
        // If input is empty, set it to '00'
        inputElement.value = '00';
    } else if (inputElement.value.length === 1) {
        // If length is 1, pad with a leading zero
        inputElement.value = inputElement.value.padStart(2, '0');
    } else if (inputElement.value.length > 2) {
        // If length is more than 2, alert and set to '00'
        alert(`Please enter a valid two-digit value for ${inputElement.id}.`);
        inputElement.value = '00';
    }
},




    /**
     * Reads the input values for hours, minutes, and seconds, and
     * calculates the total time in seconds.
     */
    getTimeInput() {
        const hoursInput = document.getElementById('hours');
        const minutesInput = document.getElementById('minutes');
        const secondsInput = document.getElementById('seconds');

        this.checkAndPadInput(hoursInput);
        this.checkAndPadInput(minutesInput);
        this.checkAndPadInput(secondsInput);

        let hours = hoursInput.value;
        let minutes = minutesInput.value;
        let seconds = secondsInput.value;

        this.totalSeconds = hours * 3600 + minutes * 60 + Number(seconds);
        this.remainingSeconds = this.totalSeconds;
    },

    

    /**
 * Displays the current remaining time in HH:MM:SS format.
 * Also changes the color based on the remaining time.
 * Updates the progress ring based on remaining time.
 */
displayTime() {
    let hours = Math.floor(this.remainingSeconds / 3600);
    let minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    let seconds = this.remainingSeconds % 60;

    // Update timer display
    document.getElementById('timer-placeholder').innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update progress ring
let progressRing = document.querySelector('.progress-ring__circle');
const radius = progressRing.getAttribute('r');
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = circumference;
const offset = ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * circumference;
progressRing.style.strokeDashoffset = circumference - offset;

    // Color changes based on the remaining time.
    if (this.remainingSeconds <= 10) {
        document.getElementById('timer-placeholder').style.color = "#FF0000";
    } else {
        document.getElementById('timer-placeholder').style.color = "#FEC328";
    }

    
},


    /**
     * Starts the timer countdown.
     */
    runTimer() {

        // If totalSeconds is zero, show an alert and return
        if (this.totalSeconds <= 0) {
            alert("Please input a time before starting the timer.");
            return;
        }

        // Disable the start button
        const startButton = document.querySelector("[data-type='start']");
        startButton.disabled = true;

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
        this.isActive = true; // Update the isActive property

    },


    /**
     * Pauses the timer by clearing the interval.
     */
    pauseTimer() {
        if (this.isActive) { // Only allow pausing if the timer is active
            clearInterval(this.timerInterval);
            this.paused = true;
        }
    },

    /**
     * Resumes the paused timer.

     */
    resumeTimer() {
        if (this.paused && this.isActive) { // Only allow resuming if the timer is paused and active
            this.timerInterval = setInterval(() => {
                this.remainingSeconds -= 1;
                this.displayTime();

                // When time's up, clear interval and alert the user.
                if (this.remainingSeconds <= 0) {
                    clearInterval(this.timerInterval);
                    alert("Timer finished!");
                    this.isActive = false; // Update the isActive flag
                }
            }, 1000);
            this.paused = false;
        }
    },



    /**
     * Resets the timer to the originally set time.
     */
    resetTimer() {
        if (this.isActive) { // Only allow resetting if the timer is active
            clearInterval(this.timerInterval);
            this.remainingSeconds = 0;
            this.totalSeconds = 0;
            this.displayTime();

            // Reset the input values to empty strings after timer reset
            document.getElementById('hours').value = '';
            document.getElementById('minutes').value = '';
            document.getElementById('seconds').value = '';

            this.isActive = false; // Update the isActive flag
            this.paused = false; // Reset the pause state

            // Enable the start button
            const startButton = document.querySelector("[data-type='start']");
            startButton.disabled = false;
        }
    },


}

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons
    const startButton = document.querySelector("[data-type='start']");
    const pauseButton = document.querySelector("[data-type='pause']");
    const playButton = document.querySelector("[data-type='play']");
    const resetButton = document.querySelector("[data-type='reset']");

    // Handle Start button click
    function handleStartButtonClick() {
        timer.getTimeInput();
        timer.runTimer();

        // Enable the buttons
        pauseButton.disabled = false;
        playButton.disabled = false;
        resetButton.disabled = false;

        // Disable the start button
        startButton.disabled = true;

        // Reset the input values to 0 after timer starts
        document.getElementById('hours').value = "";
        document.getElementById('minutes').value = "";
        document.getElementById('seconds').value = "";
    }

    // Add event listeners to the buttons
    startButton.addEventListener('click', handleStartButtonClick);
    pauseButton.addEventListener('click', () => {
        timer.pauseTimer();
        if (!timer.isActive) { // If the timer is no longer active after pausing...
            pauseButton.disabled = true; // Disable the pause button
        }
    });
    playButton.addEventListener('click', () => {
        timer.resumeTimer();
        if (timer.isActive) { // If the timer is active after resuming...
            pauseButton.disabled = false; // Enable the pause button
        }
    });
    resetButton.addEventListener('click', () => {
        timer.resetTimer();
        if (!timer.isActive) { // If the timer is no longer active after resetting...
            pauseButton.disabled = true; // Disable the pause button
            playButton.disabled = true; // Disable the play button
            resetButton.disabled = true; // Disable the reset button
        }
    });

    // Initially, the pause, play and reset buttons should be disabled
    pauseButton.disabled = true;
    playButton.disabled = true;
    resetButton.disabled = true;

    // Handle key press event for Enter key
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleStartButtonClick();
        }
    }

    // Add event listeners to the buttons
    startButton.addEventListener('click', handleStartButtonClick);
    pauseButton.addEventListener('click', timer.pauseTimer.bind(timer));
    playButton.addEventListener('click', timer.resumeTimer.bind(timer));
    resetButton.addEventListener('click', timer.resetTimer.bind(timer));

    // Add keydown event listeners to input fields
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((inputField) => {
        inputField.addEventListener('keydown', handleKeyPress);
    });
});