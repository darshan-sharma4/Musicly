console.log("Welcome to js");
let currentSong = new Audio()
let songs;
let currFolder;
let currentVolumeRange;
function formatSongTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }
    // Floor the time to remove milliseconds
    const flooredSeconds = Math.floor(seconds);

    // Calculate minutes and seconds
    const minutes = Math.floor(flooredSeconds / 60);
    const remainingSeconds = flooredSeconds % 60;

    // Format minutes and seconds with leading zeros
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted time as mm:ss
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSong(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //  Show all the songs in the playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUl.innerHTML = " "
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li><img src="/img/music.svg" alt="">
                            <div class="songinfo">
                                <div>${song.replaceAll("%20", " ")} </div>
                                <div>Artist Name</div>
                            </div> 
                           </li>`
    }
    // Add an eventllistner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e)
            // console.log(e.querySelector(".songinfo").getElementsByTagName("div")[0].innerHTML)
            playmusic(e.querySelector(".songinfo").getElementsByTagName("div")[0].innerHTML)

        })
    });
    return songs;

}
const playmusic = (track => {
    // let audio = new Audio("/songs/"+track);
    currentSong.src = `/${currFolder}/` + track;
    // console.log(currentSong.src)
    currentSong.play()
    play.src = "/img/pause.svg"
    document.querySelector(".songName").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00/00:00"
})
async function displayFolder() {
    let a = await fetch(`/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer");
    let array = Array.from(anchors)
    // console.log(array)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        // console.log(e)
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            console.log(folder)
            // getting metadata of folder..
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json()
            // console.log(response)
            // console.log(response.title)
            cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card">
                        <div class="image">
                            <div class="playButton">
                                <div
                                    style="width: 50px; height: 50px; background-color: rgb(105, 171, 105); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <div
                                        style="width: 50px; height: 50px; background-color: rgb(30, 215, 96,1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32"
                                            height="32" fill="black">
                                            <path
                                                d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                                stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <img src="/songs/${folder}/cover.jpeg" alt="">
                        </div>
                        <div>
                            <h3><span class="CardTitle__LineClamp-sc-1h38un4-0 RBShQ">${response.title}</span></h3>
                            <p>${response.disc}</p>
                        </div>

                    </div>`
        }
    }

    // add card loading functionality and update the current folder
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        // console.log(e)
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder)
            songs = await getSong(`songs/${item.currentTarget.dataset.folder}`)
        })
    });
}


async function main() {
    await getSong("songs/song2");
    // console.log(songs)
    await displayFolder();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/img/pause.svg"
            // playmusic(decodeURI(songs[0]))  
        }
        else {
            currentSong.pause();
            play.src = "/img/playbutton.svg"
        }
    })
    // Times upadate for current song
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".songTime").innerHTML = `${formatSongTime(currentSong.currentTime)}/${formatSongTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%'
    })

    // addeventListner to seekbar
    document.querySelector(".seekBar").addEventListener("click", (e) => {
        // console.log(e.offsetX / e.target.getBoundingClientRect().width) * 100
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })
    // add hamburger functionality.
    document.querySelector(".hamBurger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
        document.querySelector(".crossimg").style.visibility = "visible";
    })
    // Add event listener for close volume button
    document.querySelector(".crossimg").addEventListener("click", () => {
        document.querySelector(".left").style.left = -100 + '%';

    })

    // Add  backward function
    previous.addEventListener("click", () => {
        // console.log(songs)
        // console.log(currentSong.src.split("/songs/")[1])
        let index = songs.indexOf(currentSong.src.split(`${currFolder}/`)[1]);
        // currentSong = songs[index-1]
        if (index - 1 >= 0) {
            playmusic(songs[index - 1])
        }
    })

    // add forward functionality
    next.addEventListener("click", () => {
        console.log(songs)
        // console.log(currentSong.src.split("/songs/")[1])

        let index = songs.indexOf(currentSong.src.split(`${currFolder}/`)[1]);
        // console.log(index)
        if (index + 1 < songs.length) {
            playmusic(songs[index + 1])
        }
    })
    // add volume funnctionality
    document.getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e,e.target,e.target.value)
        console.log(e)
        currentSong.volume = e.target.value / 100;
        if(currentSong.volume>0){
            document.querySelector(".volume>img").src=e.target.src = "/img/volume.svg";
            
        }
    })

    // adding mute functionality
    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (document.getElementsByTagName("input")[0].value > 0) {
            currentVolumeRange = document.getElementsByTagName("input")[0].value;
            currentSongVolume = currentSong.volume
        }
        if (e.target.src.includes("/img/volume.svg")) {
            e.target.src = "/img/mute.svg"
            currentSong.volume = 0
            document.getElementsByTagName("input")[0].value = 0;

        }
        else {
            e.target.src = "/img/volume.svg";
            document.getElementsByTagName("input")[0].value = currentVolumeRange;
            currentSong.volume = currentSongVolume;
        }

        // get currentVolume when  we mute the song

    })
    if (!currentSong) {
        document.querySelector(".volume").innerHTML = " "
    }




}
main();