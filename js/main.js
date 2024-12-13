let value = '';
let data = ''
// dotted button of video on hover

const dropdownHtml = ` 

<div class="dropdown">
    <a><img src="../imgs/playlist.svg" alt="">Add to queue</a>
    <a><img src="../imgs/clock.svg" alt="">Save to Watch later</a>
    <a><img src="../imgs/addPlaylist.svg" alt="">Save to playlist</a>
    <a><img src="../imgs/download.svg" alt="">Download</a>
    <a ><img src="../imgs/share.svg" alt="">Share</a>
    <div class="border"></div>
    <a><img src="../imgs/notInterested.svg" alt="">Not interested</a>
    <a><img src="../imgs/recomment.svg" alt="">Don't recomment channel</a>
    <a><img src="../imgs/flag.svg" alt="">Report</a>
    </div>`



async function getVideos() {

    const url = window.location.href;
    const newURL = new URL(url);
    const urlObj = `${newURL.protocol}//${newURL.hostname}:${newURL.port}/`;


    const link = `${urlObj}videos/album1/`;
    const a = await fetch(link);
    const response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let videoContainer = document.querySelector(".videos-container");
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        let num = Math.floor(Math.random() * 8);
        let proNum = Math.floor(Math.random() * 9);
        // let proNum = Math.floor(Math.random() * 9);
        if (e.href.includes('/album1/')) {
           
            videoContainer.innerHTML = videoContainer.innerHTML + `<div class="video">
            <div data="${e.href}" class="thumbnail">
            <img class="thumbnail-img" src="../thumbnails/${num}.jpeg">
        </div>
        <div class="data">
            <div class="logo-container">
                <img src="../thumbnails/${proNum}.jpeg" alt="">
            </div>
            <div class="text-content">
                <h3 class="title">${e.title.substring(0, 30)}</h3>
                <p class="channel-name">Channel Name</p>
                <p class="views"><span>24M</span> views <span>2 days ago</span></p>
                
                </div>
                <div class="dotted-container"><button class="dotted-btn"><img src="../imgs/dotted.svg"
                        alt=""></button></div>
        </div>
        </div>`
        }
    }

    const thumbnails = videoContainer.querySelectorAll('.thumbnail')
    thumbnails.forEach(e => {
        e.addEventListener('click', () => {
            let data = e.getAttribute('data');
            localStorage.setItem('href', data);
            // its for sending the data such as url of the video to next page
            window.location = `${urlObj}html/video.html#`;
        });

    })


    const vidData = document.querySelectorAll('.data')
    vidData.forEach(element => {
        const dottedBtn = element.querySelector('.dotted-btn');
        element.addEventListener('mouseover', (e) => {
            dottedBtn.style.opacity = '1';
        })
        element.addEventListener('mouseout', () => {

            dottedBtn.style.opacity = '0';
        })
    })

    const videos = document.querySelectorAll('.video')
    videos.forEach(element => {
        const dottedContainer = element.querySelector('.dotted-container');
        dottedContainer.querySelector('.dotted-btn').addEventListener('click', () => {

            if (element.querySelector('.dropdown-container')) {
                element.querySelector('.dropdown-container').remove();
            }
            else {
                closeAllDropdowns();
                const dropdown = document.createElement('div');
                dropdown.classList.add('dropdown-container');
                dropdown.innerHTML = dropdownHtml;
                element.append(dropdown);
                const position = dropdown.getBoundingClientRect();
                dropdown.style.translate = '-180px 25px'
                if (position.x > 650) {
                    dropdown.style.translate = '-180px 25px'
                } else { }

            }
        })
    })
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.dotted-btn') && !target.closest('.dropdown')) {
            closeAllDropdowns()
        }
    })


    // For video hover effect
    const video = document.querySelectorAll('.video');

    video.forEach(element => {
        element.addEventListener('mouseover', (e) => {
            element.querySelector('.thumbnail img').style.borderRadius = '0';
        })
        element.addEventListener('mouseout', (e) => {
            element.querySelector('.thumbnail img').style.borderRadius = '0.6rem';
        })
    });

    // Search Bar
    searchInput.addEventListener('input', () => {
        videos.forEach((video) => {
            const value = searchInput.value.toUpperCase();
            const title = video.querySelector(".title").innerHTML.toUpperCase();
            if (title.includes(value)) {
                video.style.display = 'block';
            } else {
                video.style.display = 'none';
            }
        })
    })



    // getVideo function ends
}


// Closses all dropdowns when click anywhere on the screen 
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.dotted-btn') && !target.closest('.dropdown')) {
        closeAllDropdowns()
    }
})

// search on focus
const searchToggle = document.querySelector('.nav-mid form div');
const searchInput = document.querySelector('.nav-mid form input');


searchInput.addEventListener('focus', () => {
    searchToggle.style.display = 'flex';
})
searchInput.addEventListener('blur', () => {
    searchToggle.style.display = 'none';
})

// Hamburger to hide left bar

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    const leftHide = document.querySelector('.left-hide');
    const right = document.querySelector('.right');
    const left1 = document.querySelector('#left-1');

    if (leftHide.classList.contains('hidden')) {
        leftHide.classList.toggle('hidden');
        left1.classList.toggle('hidden');
        right.style.width = '94%';
    } else if (left1.classList.contains('hidden')) {
        leftHide.classList.toggle('hidden');
        left1.classList.toggle('hidden');
        right.style.width = '80%';
    }
})



// Closes all Dropdowns
function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll('.dropdown-container');
    allDropdowns.forEach(dropdown => dropdown.remove());
}

getVideos()
