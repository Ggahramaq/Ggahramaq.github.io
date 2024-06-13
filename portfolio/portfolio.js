const time = document.getElementById('time');

async function fetchInitialTime() {
    try {
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Baku');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const { day, month, year, hour, minute, seconds } = await response.json();

        return new Date(year, month - 1, day, hour, minute, seconds); 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

const addLeadingZero = (number) => number < 10 ? '0' + number : number;

fetchInitialTime().then((initialTime) => {
    if (initialTime) {
        setInterval(() => {
            initialTime.setSeconds(initialTime.getSeconds() + 1);

            const day = addLeadingZero(initialTime.getDate());
            const month = addLeadingZero(initialTime.getMonth());
            const year = initialTime.getFullYear();
            const hour = addLeadingZero(initialTime.getHours());
            const minute = addLeadingZero(initialTime.getMinutes());
            const second = addLeadingZero(initialTime.getSeconds());

            time.textContent = (`${day} ${month} ${year} г.•${hour}:${minute}:${second}`);
        }, 1000);
    }
});