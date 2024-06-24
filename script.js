let cover;
let currentSong = new Audio();
let currentFolder;
document.querySelector('.playbarSection').style.display = "none";
async function getSongs(folder){
    currentFolder = folder;    
    let songs = [];
    cover = [];
    folder = folder ? folder : 'songs/PopularAlbum/Animal';
    let api = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let responce = await api.text();
    let newDiv =  document.createElement("div");
    newDiv.innerHTML = responce;
    let as = newDiv.getElementsByTagName("a");
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith('.mp3')){
            songs.push(element.href.split("/").slice(-1)[0])
            let songUl = document.querySelector('.songsSection');    
            songUl.innerHTML = " ";
            for (let index = 0; index < songs.length; index++) {
                const element = songs[index];
                songUl.innerHTML = songUl.innerHTML + `
                <li class="songLiberyDi">
                <div class="songDi">                    
                <img class="music" src="img/music.svg" alt="">
                <h5 class ="songName"> ${element.replaceAll('%20', ' ')} </h5>
                <h3></h3>
                </div>
             </li>
            `
  
}       
    Array.from(songUl.getElementsByTagName('li')).forEach(e => {
        e.addEventListener('click',  element=>{
            playMusic(element.currentTarget.querySelector('.songName').innerHTML.trim())
        play.src = "img/pause.svg";
        document.querySelector('.playbarSection').style.display = "flex";

                    // prev song function
   prev.addEventListener("click", ()=>{
    currentSong.pause()
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    
    if(index >= 1){
     playMusic(songs[index-1])
    }
 });
 next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index < songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });

})
});
}
else if(element.href.includes('/cover.jpg')){
    cover.push(element.href.split('/').slice(-1)[0])
    document.querySelector('.imgSection').innerHTML = `
    <img src=${ folder + "/cover.jpg"} alt="" srcset="">
    <h4>${folder.split("/").slice(-1)[0].replace('%20', " ")} </h4>
    `
}
    }
};
getSongs();
async function getArtist(folder){
    currentFolder = folder;
    songs = [];
    let api = await fetch(`http://127.0.0.1:5500/songs/PopularArtist/`);
    let responce = await api.text();
    let newDiv =  document.createElement("div");
    newDiv.innerHTML = responce;
    let as = newDiv.getElementsByTagName("a");
    let songContenor = document.querySelector('.songContenor');
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.includes('/PopularArtist/')){
            folder = element.href.split('/songs/').slice(-1)[0];
            let api = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let responce = await api.json();
            songContenor.innerHTML = songContenor.innerHTML + `
            <div data-folder=${ folder} class="card"> 
                    <img  src=${"/songs/" + folder + "/cover.jpg"} +  alt="">
                    <h4>${responce.title}</h4>
                    <p>${responce.dis}</p>
                </div>
                `
            }
          
            
        }
            Array.from(songContenor.getElementsByClassName('card')).forEach(e=>{
                e.addEventListener("click", async element=>{
                  songs = await  getSongs(`/songs/${element.currentTarget.dataset.folder}`);
                  document.querySelector('.allCard').style.display = "none";
                  document.querySelector('.songsDitile').style.display = "flex";
                  document.querySelector('.navbar').style.width = "100%"
                })
            })
           

};

getArtist()


async function getAlbum(folder){
    currentFolder = folder;
    songs = [];
    let api = await fetch(`http://127.0.0.1:5500/songs/PopularAlbum/`);
    let responce = await api.text();
    let newDiv =  document.createElement("div");
    newDiv.innerHTML = responce;
    let as = newDiv.getElementsByTagName("a");
    let songContenor = document.querySelector('.albumContenor');
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.includes('/PopularAlbum/')){
            folder = element.href.split('/songs/').slice(-1)[0];
            let api = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let responce = await api.json();
            songContenor.innerHTML = songContenor.innerHTML + `
            <div data-folder=${ folder} class="card"> 
                    <img  src=${"/songs/" + folder + "/cover.jpg"} +  alt="">
                    <h4>${responce.title}</h4>
                    <p>${responce.dis}</p>
                </div>
                `
            }
        }
            Array.from(songContenor.getElementsByClassName('card')).forEach(e=>{
                e.addEventListener("click", async element=>{
                  songs = await  getSongs(`/songs/${element.currentTarget.dataset.folder}`);
                  document.querySelector('.allCard').style.display = "none";
                  document.querySelector('.songsDitile').style.display = "flex";
                   

                })
            })

};

getAlbum()
async function getSinger(folder){
    currentFolder = folder;
    songs = [];
    let api = await fetch(`http://127.0.0.1:5500/songs/PopularRadio/`);
    let responce = await api.text();
    let newDiv =  document.createElement("div");
    newDiv.innerHTML = responce;
    let as = newDiv.getElementsByTagName("a");
    let songContenor = document.querySelector('.singerContenor');
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.includes('/PopularRadio/')){
            folder = element.href.split('/songs/').slice(-1)[0];
            let api = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let responce = await api.json();
            songContenor.innerHTML = songContenor.innerHTML + `
            <div data-folder=${ folder} class="card"> 
                    <img  src=${"/songs/" + folder + "/cover.jpg"} +  alt="">
                    <h4>${responce.title}</h4>
                    <p>${responce.dis}</p>
                </div>
                `
            }
        }
            Array.from(songContenor.getElementsByClassName('card')).forEach(e=>{
                e.addEventListener("click", async element=>{
                  songs = await  getSongs(`/songs/${element.currentTarget.dataset.folder}`);
                  document.querySelector('.allCard').style.display = "none";
                  document.querySelector('.songsDitile').style.display = "flex";
                   

                })
            })

};

getSinger()

// see all function
// artist show all cards
document.querySelector('.artistShowAll').addEventListener("click", e=>{
    document.querySelector('.album').style.display = "none";
    document.querySelector('.singer').style.display = "none";
    document.querySelector('.artistShowAll').style.display = "none"
    document.querySelector('.songContenor').style.flexWrap = "wrap";
});
document.querySelector('.popular').addEventListener("click", e=>{
    document.querySelector('.album').style.display = "none";
    document.querySelector('.singer').style.display = "none";
    document.querySelector('.artistShowAll').style.display = "none"
    document.querySelector('.songContenor').style.flexWrap = "wrap";
});

// see all function
// album show all cards
document.querySelector('.albumShowAll').addEventListener("click", e=>{
    document.querySelector('.artist').style.display = "none";
    document.querySelector('.singer').style.display = "none";
    document.querySelector('.albumShowAll').style.display = "none"
    document.querySelector('.albumContenor').style.flexWrap = "wrap";
});
document.querySelector('.albumpopular').addEventListener("click", e=>{
    document.querySelector('.artist').style.display = "none";
    document.querySelector('.singer').style.display = "none";
    document.querySelector('.albumShowAll').style.display = "none"
    document.querySelector('.albumContenor').style.flexWrap = "wrap";
});

// rasio show all cards
document.querySelector('.singerShowAll').addEventListener("click", e=>{
    document.querySelector('.artist').style.display = "none";
    document.querySelector('.album').style.display = "none";
    document.querySelector('.singerShowAll').style.display = "none"
    document.querySelector('.singerContenor').style.flexWrap = "wrap";
});
document.querySelector('.singerPopular').addEventListener("click", e=>{
    document.querySelector('.artist').style.display = "none";
    document.querySelector('.album').style.display = "none";
    document.querySelector('.singerShowAll').style.display = "none"
    document.querySelector('.singerContenor').style.flexWrap = "wrap";
});

// hamburbur k liye function
document.querySelector('.hambur').addEventListener("click", e=>{
    document.querySelector('.leftSection').style.display = "flex";
    document.querySelector('.closeLeft').style.display = "flex";
    document.querySelector('.back').style.display = "none";
    document.querySelector('.next').style.display = "none";
});

// close leftSection 
document.querySelector('.closeLeft').addEventListener("click", e=>{
    document.querySelector('.leftSection').style.display = "none";
    document.querySelector('.closeLeft').style.display = "none";
    document.querySelector('.back').style.display = "flex";
    document.querySelector('.next').style.display = "flex";
});

const playMusic = (track, pause = false) => {
    currentSong.src =`${currentFolder}/` + track;
    if(!pause){        
        currentSong.play()
    };

    document.querySelector('.songinfo').innerHTML = track.replaceAll("%20", " ");
    document.querySelector('.duretion').innerHTML = "00:00/00:00";
};


async function main (){
    // song info and song duretion
   currentSong.addEventListener("timeupdate", (e)=>{
    document.querySelector('.duretion').innerHTML = `
    ${secondsToMinutesSeconds(currentSong.currentTime)} : ${secondsToMinutesSeconds(currentSong.duration)}`
    seekbar.value = (currentSong.currentTime * 100) / (currentSong.duration);
   })

   // update the song duretion

   document.querySelector('.seekbar').getElementsByTagName('input')[0].addEventListener('change', (e)=>{
    currentSong.currentTime = (currentSong.duration * e.target.value) / 100 

   });


    // play button   
    play.addEventListener("click", () => {
        if (currentSong.paused) {
          currentSong.play();
          play.src = "img/pause.svg";
        } else {
          currentSong.pause();
          play.src = "img/play.svg";
        }});

        // volume change 

         document.querySelector('.volumeIcon').getElementsByTagName('input')[0].addEventListener('change',(e)=>{
            currentSong.volume = e.target.value * 0.01;
            if(currentSong.volume > 0){
                document.querySelector('.volumeAdj').src = document.querySelector('.volumeAdj').src.replace("mute.svg", "volume.svg")
            }
         })

         // update the mute button

         document.querySelector('.volumeAdj').addEventListener("click",  (e)=>{
            if(e.target.src.includes('volume.svg')){
              e.target.src =  e.target.src.replace('volume.svg', 'mute.svg');
              document.querySelector('.volumeIcon').getElementsByTagName('input')[0].value = 0;
              currentSong.volume = 0;
            }
            else{
                e.target.src =  e.target.src.replace('mute.svg', 'volume.svg');
                currentSong.volume = 0.10;
                document.querySelector('.volumeIcon').getElementsByTagName('input')[0].value = 10;
            }
           

         })
};

function secondsToMinutesSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(0);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }
  main();