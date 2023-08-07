let term = '';
const songContainer = document.getElementById('songs');

const addTerm = () => {
    term = document.getElementById('searchInput').value;

    if(!term || term === '') {
        alert('Ponovno unesi ime');
    } else {

        while(songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }

        const url = `https://itunes.apple.com/search?limit=15&media=music&term=${term}`;

        fetch(url)
        .then( (response) => response.json() )
        .then( (data) => {
        
            const artists = data.results;
            return artists.map(result => {

                const article = document.createElement('article'),
                    artist = document.createElement('p'),
                    song = document.createElement('p'),
                    audio = document.createElement('audio'),
                    audioSource = document.createElement('source');

                    artist.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    audioSource.src = result.previewUrl;
                    audio.setAttribute('controls', '');

                    
                    article.appendChild(artist);
                    article.appendChild(song);
                    article.appendChild(audio);
                    audio.appendChild(audioSource);
                    songContainer.appendChild(article);                

                    article.setAttribute('class', 'player');
                    artist.setAttribute('class', 'artist')
                    song.setAttribute('class', 'songTitle');

                    audio.setAttribute('class', 'audio');
            })   
        })
    }
};

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', addTerm);


document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i = 0; i < audio.length; i++) {
        if(audio[i] != event.target) {
            audio[i].pause();
        }

        window.addEventListener("load", () => {
            const loader = document.querySelector(".loader");
            loader.classList.add("loader-hidden");
        
            loader.addEventListener("transitionend", () => {
                loader.remove();
            })
        })
    }
}, true);