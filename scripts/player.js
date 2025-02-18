let track_art = document.querySelector('.player .track-info .cover');
let track_name = document.querySelector('.player .track-details .track-name');
let track_artist = document.querySelector('.player .track-details .artist');
let next_track = document.querySelector('.player .track-details .next-track');

let playpause_btn = document.querySelector('.player .controls .play-pause');
let next_btn = document.querySelector('.player .controls .play-forward');
let prev_btn = document.querySelector('.player .controls .play-back');

let seek_slider = document.querySelector('.player .track-position input');
let volume_slider = document.querySelector('.player .controls .volume input');
let curr_time = document.querySelector('.player .track-position .currTime');
let total_duration = document.querySelector('.player .track-position .trackTime');
let volumeIco = document.querySelector('.player .controls .volume svg');
let curr_track = document.createElement('audio');
let waveLineFirst = document.querySelector('.player .track-info .wave .line.first');
let waveLineSecond = document.querySelector('.player .track-info .wave .line.second');
let waveLineThird = document.querySelector('.player .track-info .wave .line.third');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
    {
        img : "./assets/music/fucksum.jpg",
        name : "FUCK SUM.",
        artist : "kédalos",
        music : "./assets/music/fucksum.mp3"
    },
    {
        img : "./assets/music/hotgirls.jpg",
        name : "Hot Girl",
        artist : "Charli XCX",
        music : "./assets/music/hotgirls.mp3"
    },
    {
        img : "./assets/music/bandit.jpg",
        name : "Bandit",
        artist : "Don Toliver",
        music : "./assets/music/BANDIT.mp3"
    },
    {
        img : "./assets/music/10x10.jpg",
        name : "10/10",
        artist : "Cobrah",
        music : "./assets/music/10-world79.spcs.bio.mp3"
    },
    {
        img : "./assets/music/vondutch.jpg",
        name : "Von Dutch",
        artist : "Charli XCX",
        music : "./assets/music/Charli_Xcx-Von_Dutch-world79.spcs.bio.mp3"
    },
    {
        img : "./assets/music/likeme.jpg",
        name : "Like Me",
        artist : "Chase Icon",
        music : "./assets/music/Chase Icon Like Me.mp3"
    },
    {
        img : "./assets/music/activate.jpg",
        name : "ACTIVATE",
        artist : "Cobrah",
        music : "./assets/music/Cobrah-ACTIVATE-world79.spcs.bio.mp3"
    },
    {
        img : "./assets/music/riot.jpg",
        name : "Riot & Set it off",
        artist : "Yeat",
        music : "./assets/music/Riot & Set it off.mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    var next_index = (track_index + 1) % music_list.length;
    next_track.textContent = "Next: " + music_list[next_index].artist + " - " + music_list[next_index].name;

    updateTimer = setInterval(setUpdate, 0);

    curr_track.addEventListener('ended', nextTrack);
}   

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
//function randomTrack(){
//    isRandom ? pauseRandom() : playRandom();
//}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"/></svg>';
    track_art.style.opacity = '1';
    track_art.style.transform = 'scale(1)';
    
    waveLineFirst.style.animationPlayState  = 'running';
    waveLineSecond.style.animationPlayState  = 'running';
    waveLineThird.style.animationPlayState  = 'running';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"/></svg>';
    track_art.style.opacity = '.9';
    track_art.style.transform = 'scale(.9)';
    
    waveLineFirst.style.animationPlayState  = 'paused';
    waveLineSecond.style.animationPlayState  = 'paused';
    waveLineThird.style.animationPlayState  = 'paused';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }

    // Плавне згасання поточного треку
    let fadeOut = setInterval(() => {
        if (curr_track.volume > 0.05) {
            curr_track.volume -= 0.05;
        } else {
            clearInterval(fadeOut);
            curr_track.pause();
            curr_track.volume = 1; // Скидаємо гучність перед новим треком

            loadTrack(track_index);
            curr_track.volume = 0; // Починаємо новий трек із 0 гучності
            curr_track.play();

            // Плавне збільшення гучності
            let fadeIn = setInterval(() => {
                if (curr_track.volume < 0.95) {
                    curr_track.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                    curr_track.volume = 1; // Гучність на максимум
                }
            }, 20); // Крок зміни гучності кожні 200 мс
        }
    }, 20);
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    if (isPlaying == false) {
        pauseTrack();
    } else {
       playTrack();
    }
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100000);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
    
    if(volume_slider.value > 70) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 416a23.88 23.88 0 01-14.2-4.68 8.27 8.27 0 01-.66-.51L125.76 336H56a24 24 0 01-24-24V200a24 24 0 0124-24h69.75l91.37-74.81a8.27 8.27 0 01.66-.51A24 24 0 01256 120v272a24 24 0 01-24 24zm-106.18-80zm-.27-159.86zM320 336a16 16 0 01-14.29-23.19c9.49-18.87 14.3-38 14.3-56.81 0-19.38-4.66-37.94-14.25-56.73a16 16 0 0128.5-14.54C346.19 208.12 352 231.44 352 256c0 23.86-6 47.81-17.7 71.19A16 16 0 01320 336z"/><path d="M368 384a16 16 0 01-13.86-24C373.05 327.09 384 299.51 384 256c0-44.17-10.93-71.56-29.82-103.94a16 16 0 0127.64-16.12C402.92 172.11 416 204.81 416 256c0 50.43-13.06 83.29-34.13 120a16 16 0 01-13.87 8z"/><path d="M416 432a16 16 0 01-13.39-24.74C429.85 365.47 448 323.76 448 256c0-66.5-18.18-108.62-45.49-151.39a16 16 0 1127-17.22C459.81 134.89 480 181.74 480 256c0 64.75-14.66 113.63-50.6 168.74A16 16 0 01416 432z"/></svg>';}
    if(volume_slider.value <= 70) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M264 416.19a23.92 23.92 0 01-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 01-24-24V200a24 24 0 0124-24h69.65l91.46-75 .66-.51A24 24 0 01288 119.83v272.34a24 24 0 01-24 24zM352 336a16 16 0 01-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0128.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 01352 336z"/><path d="M400 384a16 16 0 01-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 01413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 01-13.88 8z"/></svg>';}
    if(volume_slider.value <= 30) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 416.19a23.92 23.92 0 01-14.21-4.69l-.66-.51-91.46-75H120a24 24 0 01-24-24V200a24 24 0 0124-24h69.65l91.46-75 .66-.51A24 24 0 01320 119.83v272.34a24 24 0 01-24 24zM384 336a16 16 0 01-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0128.5-14.54C410.2 208.16 416 231.47 416 256c0 23.83-6 47.78-17.7 71.18A16 16 0 01384 336z"/></svg>';}
    if(volume_slider.value == 0) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344 416a23.92 23.92 0 01-14.21-4.69c-.23-.16-.44-.33-.66-.51l-91.46-74.9H168a24 24 0 01-24-24V200.07a24 24 0 0124-24h69.65l91.46-74.9c.22-.18.43-.35.66-.51A24 24 0 01368 120v272a24 24 0 01-24 24z"/></svg>';}
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100000 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
function volumeMute() {
    curr_track.volume = 0;
    volume_slider.value = 0;
    
    if(volume_slider.value >= 71) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 416a23.88 23.88 0 01-14.2-4.68 8.27 8.27 0 01-.66-.51L125.76 336H56a24 24 0 01-24-24V200a24 24 0 0124-24h69.75l91.37-74.81a8.27 8.27 0 01.66-.51A24 24 0 01256 120v272a24 24 0 01-24 24zm-106.18-80zm-.27-159.86zM320 336a16 16 0 01-14.29-23.19c9.49-18.87 14.3-38 14.3-56.81 0-19.38-4.66-37.94-14.25-56.73a16 16 0 0128.5-14.54C346.19 208.12 352 231.44 352 256c0 23.86-6 47.81-17.7 71.19A16 16 0 01320 336z"/><path d="M368 384a16 16 0 01-13.86-24C373.05 327.09 384 299.51 384 256c0-44.17-10.93-71.56-29.82-103.94a16 16 0 0127.64-16.12C402.92 172.11 416 204.81 416 256c0 50.43-13.06 83.29-34.13 120a16 16 0 01-13.87 8z"/><path d="M416 432a16 16 0 01-13.39-24.74C429.85 365.47 448 323.76 448 256c0-66.5-18.18-108.62-45.49-151.39a16 16 0 1127-17.22C459.81 134.89 480 181.74 480 256c0 64.75-14.66 113.63-50.6 168.74A16 16 0 01416 432z"/></svg>';}
    if(volume_slider.value <= 50) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M264 416.19a23.92 23.92 0 01-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 01-24-24V200a24 24 0 0124-24h69.65l91.46-75 .66-.51A24 24 0 01288 119.83v272.34a24 24 0 01-24 24zM352 336a16 16 0 01-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0128.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 01352 336z"/><path d="M400 384a16 16 0 01-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 01413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 01-13.88 8z"/></svg>';}
    if(volume_slider.value <= 30) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 416.19a23.92 23.92 0 01-14.21-4.69l-.66-.51-91.46-75H120a24 24 0 01-24-24V200a24 24 0 0124-24h69.65l91.46-75 .66-.51A24 24 0 01320 119.83v272.34a24 24 0 01-24 24zM384 336a16 16 0 01-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0128.5-14.54C410.2 208.16 416 231.47 416 256c0 23.83-6 47.78-17.7 71.18A16 16 0 01384 336z"/></svg>';}
    if(volume_slider.value == 0) {volumeIco.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344 416a23.92 23.92 0 01-14.21-4.69c-.23-.16-.44-.33-.66-.51l-91.46-74.9H168a24 24 0 01-24-24V200.07a24 24 0 0124-24h69.65l91.46-74.9c.22-.18.43-.35.66-.51A24 24 0 01368 120v272a24 24 0 01-24 24z"/></svg>';} 
}







