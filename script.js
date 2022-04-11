
const display = document.getElementById('time');
const alarmList = document.getElementById('alarm-list');

// Form 
const form = document.querySelector('form');

// Alarm audio 
const audio = new Audio('audio/alarm-audio.wav');


// Buttons 
const setAlarm = document.querySelector('.set_alarm');
const stopButton = document.querySelector('.stop_alarm');

// Array to store all the alarms 
let alarmArray = [];

class Alarm{
    constructor(hour,minute,second,dayNight){
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.dayNight = dayNight;
    }
}



// Function to update time 
function time(){

    const date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let sec =date.getSeconds();
    let isAm = "AM";
    

    if(hour > 12){
        hour = hour - 12;
        isAm = "PM";
        if(hour < 10) hour = "0"+hour;
    }else if(hour == 0){
        isAm = "AM";
        hour = 12;
    }else if(hour == 12){
        isAM = "PM";
    }

    if(minute < 10) minute = "0"+ minute;
    if(sec < 10) sec = "0" + sec;

    let timeString = hour +":"+ minute +":"+ sec +" "+ isAm;
    

    if(alarmArray.includes(timeString)){
        playAudio();
    }
    display.classList.add('gradient');
    display.innerText = `${hour}:${minute}:${sec} ${isAm}`;
  

}


// To format time 
// converts 2:3:45 to 02:03:45 
function formatTime(time){
    if(time < 10) return "0"+time;
    return time;
}



// Adds alarm to UI i.e. on the page 
function addNewAlarm(alarm){
    const newAlarmUI = document.createElement('div');
    newAlarmUI.classList.add('alarm-style');
    newAlarmUI.innerHTML = ` 
        <div class="alarm">
        <span hidden> ${alarm.id} </span>
        <h2> ${alarm.hour}:${alarm.minute}:${alarm.second} ${alarm.dayNight} </h2>
        </div>
        <button class="del_alarm">Delete Alarm</button>
    `
    alarmList.appendChild(newAlarmUI);
}



// Event listner for the form to add the alarm to the array of alarms i.e. alarmArray 
form.addEventListener('click', (e) => {

    e.preventDefault();
    if(e.target.classList.contains('set_alarm')){
        
        console.log("set alarm clicked");
        const hour = formatTime(document.querySelector('#hour').value);
        const minute = formatTime(document.querySelector('#minute').value);
        const second = formatTime(document.querySelector('#second').value);
        const dayNight = document.querySelector('#dayNight').value;
        
        if(hour <= 0 || hour > 12 || minute < 0 || minute > 59 || second < 0 || second >59){
            alert("Enter Valid Time");
            return;
        }

        const newAlarm = new Alarm(hour,minute,second,dayNight);
        let time = `${hour}:${minute}:${second} ${dayNight}`;

        document.querySelector('#hour').value = "";
        document.querySelector('#minute').value = "";
        document.querySelector('#second').value = "";

        if(alarmArray.includes(time)){
            showAlertMessage('Alarm Already Present','success');
            return;
        }
        alarmArray.push(time);

        addNewAlarm(newAlarm);

        showAlertMessage('Alarm Added','success');
    }

});



// To delete the alarm from the UI i.e. from the page as well as from the alarmArray 
alarmList.addEventListener('click', (e) =>{
    e.preventDefault();
    if(e.target.classList.contains('del_alarm')){
        let time = e.target.parentElement.querySelector('div h2').innerText;
        for(let i = 0; i < alarmArray.length; i++){
            if(alarmArray[i] == time){
                alarmArray.splice(i,1);
    
            }
        }

        e.target.parentElement.remove();
        time = "";
        showAlertMessage('Alarm Deleted','danger');
    }

});




// To display message after setting or deletion of alarm 
function showAlertMessage(message,alertClass){
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin',alertDiv);
    setTimeout(()=> alertDiv.remove(),1500);
}




// Function to play and pause audio 
function playAudio(){

    audio.play();
    stopButton.addEventListener('click', (e) =>{
        audio.pause();
    });

}




// To call the time function every second 
setInterval(time,1000);

