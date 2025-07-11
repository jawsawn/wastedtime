const planner_blocks = document.getElementById("planner-blocks");
const planner_labels = document.getElementById("planner-labels");
const planner_labels_end = document.getElementById("planner-labels-end");
const now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
const sleepStartInput = document.getElementById('sleep-start');
let hour_shift = 2;
let AMPM = false;
const ampmModeCheckbox = document.getElementById('ampm-mode');
const emptyColorInput = document.getElementById('empty-color');
const pastColorInput = document.getElementById('past-color');

ampmModeCheckbox.addEventListener('change', () => {
    AMPM = ampmModeCheckbox.checked;
    updateTimeBlock();
});

sleepStartInput.addEventListener('change', () => {
    hour_shift = +sleepStartInput.value.split(':')[0];
    updateTimeBlock();
});

emptyColorInput.addEventListener('input', () => document.documentElement.style.setProperty('--empty-color', emptyColorInput.value));
pastColorInput.addEventListener('input', () => document.documentElement.style.setProperty('--past-color', pastColorInput.value));

function updateTimeBlock() {
    planner_labels.innerHTML = '';
    for (let i = 0 + hour_shift; i < 24 + hour_shift; i++) {

        const element = document.createElement("div");
        element.className = "time-label";
        if (AMPM) {
            element.textContent = `${i % 12 === 0 ? 12 : i % 12} ${i % 24 < 12 ? 'AM' : 'PM'}`;
        } else {
            element.textContent = `${i % 24 < 10 ? '0' : ''}${i % 24}:00`;
        }
        //if (i < currentHour) element.classList.add('past');
        planner_labels.appendChild(element);
    }
    planner_labels_end.innerHTML = '';
    for (let i = 1 + hour_shift; i < 25 + hour_shift; i++) {

        const element = document.createElement("div");
        element.className = "time-label";
        element.textContent = `${i % 24 < 10 ? '0' : ''}${i % 24}:00`;
        element.classList.add('time-label-right');
        //if (i < currentHour) element.classList.add('past');
        planner_labels_end.appendChild(element);
    }


    const now = new Date();
    currentHour = now.getHours();
    currentMinutes = now.getMinutes();
    planner_blocks.innerHTML = '';
    for (let i = 0; i < 24 * 4; i++) {
        const element = document.createElement("div");
        element.className = "time-block";
        element.id = `time - block - ${i} `;
        element.addEventListener('click', () => { element.classList.toggle('active'); });

        const normalized_time = ((currentHour - hour_shift + 24) % 24) * 4 + Math.floor(currentMinutes / 15);
        // past time blocks
        if (i < normalized_time)
            element.classList.add('past');
        // now time block
        if (i === normalized_time)
            element.classList.add('now');

        planner_blocks.appendChild(element);
    }
}

updateTimeBlock(); // Initial write
setInterval(() => {

    updateTimeBlock();
}, 60000); // Update every minute

const settingsToggle = document.getElementById('settings-toggle');
const settingsContainer = document.getElementById('settings-container');

settingsToggle.addEventListener('click', () => {
    settingsContainer.classList.toggle('show');
});