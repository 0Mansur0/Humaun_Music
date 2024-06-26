"use strict";

// Change the color of the logo AFTER it's loaded
document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById('logo');

    svgObject.addEventListener('load', function () {
        const svgDoc = svgObject.contentDocument;

        if (svgDoc) {
            const paths = svgDoc.querySelectorAll('path');

            if (paths.length > 0) {
                paths.forEach(path => path.setAttribute('fill', 'white'));
            } else {
                console.error('No paths found in the SVG.');
            }
        } else {
            console.error('Unable to access SVG document.');
        }
    });
});

const audio = new Audio();

// Get the play | pause button
// it's textContent will be "play_circle" or "pause_circle"
const playPause = document.getElementById("playPause"); 

// Get the mute | unmute button
// it's textContent will be "volume_off" or "volume_up"
const muteUnmute = document.getElementById("muteUnmute");

// Get the volume slider, input element
const volume = document.getElementById("volumeSlider");

// Get the genre dropdown, value is one of
// the keys in the music object or "" then play everything
const genre = document.getElementById("genre-dropdown");

// Get the music table
const musicTable = document.getElementById("music-table");

const music =
{
    "ambient": [
        {
            title: "Sweet Dreams",
            artist: "BatchBug",
            source: "audio/ambient/BatchBug_-_Sweet Dreams.mp3"
        },
        {
            title: "Make-a-Wish-Calm-Classical-Music",
            artist: "chosic.com",
            source: "audio/ambient/Make-a-Wish-Calm-Classical-Music-chosic.com_.mp3"
        },
        {
            title: "Warm-Memories-Emotional-Inspiring-Piano",
            artist: "chosic.com",
            source: "audio/ambient/Warm-Memories-Emotional-Inspiring-Piano(chosic.com).mp3"
        },
        {
            title: "Magical-Moments",
            artist: "chosic.com",
            source: "audio/ambient/Magical-Moments-chosic.com_.mp3"
        },
        {
            title: "melody-of-nature-main",
            artist: "chosic.com",
            source: "audio/ambient/melody-of-nature-main(chosic.com).mp3"
        }
    ],
    "classical":
    [
        {
            title: "Entrance to the Queen of Sheba",
            artist: "Handel",
            source: "audio/classical/Handel_-_Entrance_to_the_Queen_of_Sheba_for_Two_Oboes_Strings_and_Continuo_allegro.mp3"
        },
        {
            title: "Adagio For Organ & Strings In G Minor",
            artist: "Albinoni",
            source: "audio/classical/Albinoni_-_Adagio_For_Organ_&_Strings_In_G_Minor.mp3"
        },
        {
            title: "Suite no. 3 in D major BWV 1068",
            artist: "Bach",
            source: "audio/classical/Bach_-_-Suite_no._3_in_D_major_BWV_1068.mp3"
        },
        {
            title: "Spring from the Four Seasons",
            artist: "Vivaldos",
            source: "audio/classical/Vivaldos_-_Spring_from_the_Four_Seasons.mp3"
        },
        {
            title: "Serenade in G major",
            artist: "Mozart",
            source: "audio/classical/Mozart_-_Serenade_in_G_major.mp3"
        },
        {
            title: "Overture to The marriage of Figaro K 492",
            artist: "Mozart",
            source: "audio/classical/Mozart_-_Overture_to_The_marriage_of_Figaro_K_492.mp3"
        },
        {
            title: "Brandenburg Concerto No. 3, 1st movement",
            artist: "Bach",
            source: "audio/classical/1721 Bach , Brandenburg Concerto No. 3, 1st movement.mp3"
        },
        {
            title: "Minuet and Badinerie (from Orchestral Suite No. 2 in B Minor)",
            artist: "Bach",
            source: "audio/classical/1721 Bach , Minuet and Badinerie (from Orchestral Suite No. 2 inB Minor).mp3"
        },
    ],
    "pop":
    [
        {
            title: "Dance",
            artist: "Luke Bergs",
            source: "audio/pop/Luke_Bergs_-_Dance.mp3"
        },
        {
            title: "Farming-By-Moonlight",
            artist: "chosic.com",
            source: "audio/pop/Farming-By-Moonlight(chosic.com).mp3"
        },
        {
            title: "teatime",
            artist: "chosic.com",
            source: "audio/pop/teatime(chosic.com).mp3"
        },
        {
            title: "Trip",
            artist: "chosic.com",
            source: "audio/pop/Trip(chosic.com).mp3"
        }
    ],
    "rock":
    [
        {
            title: "Born To Drive",
            artist: "AudioCoffee",
            source: "audio/rock/AudioCoffee_-_Born_To_Drive.mp3"
        }
    ]
};

const playerSettings =
{
    muted: false,
    paused: true,
    src: "",
    currentTime: 0,
    volume: 0.5,
    genre: "All"
}

function updatePlayerSettings()
{
    const newSettings =
    {
        muted: muteUnmute.textContent === "volume_off",
        paused: playPause.textContent === "pause_circle",
        src: audio.src,
        currentTime: audio.currentTime,
        volume: volume.value,
        genre: genre.value
    }

    for (const [key, value] of Object.entries(newSettings))
    {
        playerSettings[key] = value;
    }
}

function play()
{
    if (audio.paused)
    {
        audio.play();
    }
    else
    {
        audio.pause();
    }
}

// Make sure any play | pause event is handled
audio.addEventListener("pause", () => playPause.textContent = "play_circle");
audio.addEventListener("play", () => playPause.textContent = "pause_circle");

// Play/Pause functionality
playPause.addEventListener("click", () =>
{  // Check if an audio source is set
    if (audio.src === "")
    {
        alert("Provide a genre to play, please!");
        return;
    }
    play();
});

// Mute/Unmute functionality
muteUnmute.addEventListener("click", () =>
{
    if (audio.muted)
    {
        audio.muted = false;
        muteUnmute.textContent = "volume_up";
    }
    else
    {
        audio.muted = true;
        muteUnmute.textContent = "volume_off";
    }
    updatePlayerSettings();
});

// Volume change functionality
volume.addEventListener("input", () =>
{
    audio.volume = volume.value / 100; // Normalize volume
    updatePlayerSettings();
});

// Genre change functionality
genre.addEventListener("change", () =>
{
    // Clear the current audio source
    audio.src = "";

    const selectedGenre = genre.value;
    if (selectedGenre !== "")
    {
        const tracks = music[selectedGenre];
        if (tracks.length > 0)
        {
            audio.src = tracks[0].source;
        }
    }

    // Start playing the selected track
    // audio.play();    // Don't play automatically on genre change
    updatePlayerSettings();

    // Update the music list
    updateMusicList(selectedGenre);
});

function updateMusicList(selectedGenre){
    musicTable.innerHTML = ''; // Clear the table
    const tracks = selectedGenre === "All" ? Object.values(music).flat() : music[selectedGenre];

    const tableHeader = musicTable.insertRow();
    const titleCell = tableHeader.insertCell();
    const artistCell = tableHeader.insertCell();
    titleCell.textContent = "Title";
    artistCell.textContent = "Artist";

    let currentTrackIndex = 0;

    tracks.forEach((track, index) =>
    {
        const row = musicTable.insertRow();
        const titleCell = row.insertCell();
        const artistCell = row.insertCell();

        titleCell.textContent = track.title;
        artistCell.textContent = track.artist;

        row.addEventListener("click", () =>
        {
            audio.src = track.source;
            audio.play();
            playPause.textContent = "pause_circle";
            currentTrackIndex = index;
            updatePlayerSettings();
        });
    });

    // Autoplay the first song when a genre is selected
    if (tracks.length > 0)
    {
        audio.src = tracks[0].source;
        audio.play();
        playPause.textContent = "pause_circle";
        currentTrackIndex = 0;
        updatePlayerSettings();
    }

    audio.onended = () =>
    { // Event listener for when a song ends
        currentTrackIndex++;
        if (currentTrackIndex >= tracks.length)
        {
            currentTrackIndex = 0; // Loop back to the beginning
        }
        audio.src = tracks[currentTrackIndex].source;
        audio.play();
    };
}
