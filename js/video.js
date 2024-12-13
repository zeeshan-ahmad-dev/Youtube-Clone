document.querySelector('.left-panel').classList.add('hidden');


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

// Main Features
async function getVideos() {
        // videos folder url


        const url = window.location.href;
        const newURL = new URL(url);
        const urlObj = `${newURL.protocol}//${newURL.hostname}:${newURL.port}`;

        const link = `${urlObj}/videos/album1/`;
        const a = await fetch(link);
        const response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let videoContainer = document.querySelector(".videos-container");
        let anchors = div.getElementsByTagName("a");
        let array = Array.from(anchors);
        for (let index = 0; index < array.length; index++) {
                const e = array[index];
                let num = 0;
                let proNum = Math.floor(Math.random() * 9);
                // let proNum = Math.floor(Math.random() * 9);

                if (e.href.includes('/album1/')) {

                        videoContainer.innerHTML = videoContainer.innerHTML + `<div class="vid">
                <div data='${e.href}' class="thumbnail">
                    <img src="../thumbnails/${proNum}.jpeg" alt="">
                </div>
                <div data='${e.href}' class="data">
                    <h3>${e.title.substring(0, 30)}</h3>
                    <div>
    
                        <div class="channel-name">Channel Name</div>
                        <div class="views-time">
                            <p><span>2.2k</span> views <span>•</span> <span>1</span>hours ago</p>
                        </div>
                    </div>
                </div>
                <div class="hover vid-btn">
                <button>
                    <img src="../imgs/dotted.svg">
                    </button>
                </div>
            </div>
            `;
                }
        }

        const thumbnails = videoContainer.querySelectorAll('.thumbnail')
        thumbnails.forEach(e => {
                e.addEventListener('click', () => {
                        let data = e.getAttribute('data');
                        localStorage.setItem('href', data);

                        // next page data
                        window.location = `${urlObj}/html/video.html#`;
                        location.reload();
                });

        })

        const videos = document.querySelectorAll('.vid');
        videos.forEach(element => {
                console.log(element)
                const dottedContainer = element.querySelector('.vid-btn');
                dottedContainer.querySelector('.vid-btn button').addEventListener('click', () => {

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
                if (!target.closest('.vid-btn button') && !target.closest('.dropdown')) {
                        closeAllDropdowns()
                }
        })


        const vidData = document.querySelectorAll('.vid')
        vidData.forEach(element => {
                const dottedBtn = element.querySelector('.vid-btn button');
                element.addEventListener('mouseover', (e) => {
                        dottedBtn.style.opacity = '1';
                })
                element.addEventListener('mouseout', () => {

                        dottedBtn.style.opacity = '0';
                })
        })

        // Adding Comments
        const commentBox = document.querySelector('.label input');
        const commentBtnContainer = document.querySelector('.comment-buttons');
        commentBox.addEventListener('focus', () => {
                commentBtnContainer.style.display = 'flex';
        })
        commentBox.addEventListener('blur', () => {
                if (commentBox.value.length === 0) {
                        commentBtnContainer.style.display = 'none';
                } else { }
        })
        document.querySelector('#cancelBtn').addEventListener('click', () => {
                commentBox.value = "";
                commentBtnContainer.style.display = 'none';

        })

        document.getElementById('commentBtn').addEventListener('click', () => {
                const commmentContainer = document.querySelector('.comments-container');
                const commentValue = commentBox.value;
                const div = document.createElement("div");
                div.classList.add('comment');
                const comment = `<div class="com-left">
                <a><img width="40" height="40" src="../imgs/logo1.png" alt=""></a>
                </div>
                <div class="com-right">
                    <div class="mail-time">
                        <span class="gmail">@victorb22622</span>
                        <p><span class="time">10</span>hours ago</p>
                    </div>
                    <div class="com-data">${commentValue}
                    </div>
                    <div class="com-toolbar">
                    <div class="like">
                    <img class="hover" src="../imgs/like.svg" alt="">
                    <span>0</span>
                    </div>
                    <div class="dislike hover">
                            <img src="../imgs/dislike.svg" alt="">
                            </div>
                            <div class="reply hover">Reply</div>
                    </div>
                    </div>`
                div.innerHTML = div.innerHTML + comment;
                commmentContainer.append(div);
                commentBox.value = '';
        })

        const video = document.querySelector('.player-container video');
        video.play();

}


// Closes all Dropdowns
function closeAllDropdowns() {
        const allDropdowns = document.querySelectorAll('.dropdown-container');
        allDropdowns.forEach(dropdown => dropdown.remove());
}

const hamburger = document.querySelectorAll('.hamburger');
hamburger.forEach(burger => {
        burger.addEventListener('click', () => {
                const leftPanel = document.querySelector('.left-panel');
                if (leftPanel.classList.contains('hidden')) {
                        leftPanel.classList.toggle("hidden");
                        document.body.classList.toggle('overflow-y');
                } else {
                        leftPanel.classList.toggle("hidden");
                        document.body.classList.toggle('overflow-y');
                }
        })
});


getVideos();
//----------------------------------------------------


// Animations
const video = document.querySelector("video");
// const source = vid.querySelector('source'); 
let data = localStorage.getItem("href");
video.setAttribute('src', data);


// ----------------comments animation ---------------
const inputBox = document.querySelector(".label input");
const inputUnderline = document.querySelector(".label .underline");
inputBox.addEventListener('focus', () => {
        inputUnderline.style.transform = "scaleX(1)"
})
inputBox.addEventListener('blur', () => {
        inputUnderline.style.transform = "scaleX(0)"
})

// comments buttons
const commentBtn = document.querySelector('.buttons #commentBtn');
inputBox.addEventListener('input', () => {
        if (inputBox.value.length > 0) {
                commentBtn.removeAttribute('disabled')
        } else {
                commentBtn.setAttribute('disabled', true)
        }
})


