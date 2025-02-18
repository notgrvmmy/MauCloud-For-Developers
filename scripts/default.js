let searchInput = document.querySelector('#search_input');
let searchLabel = document.querySelector('.search_label');
let searchIcon = document.querySelector('.search_area svg');
let searchRect = document.querySelector('.search_area .rect');
let langBtn = document.querySelector('.controlls .lang');
let langSection = document.querySelector('.lang_window');
let settingsBtn = document.querySelector('.controlls .settings');
let setMenu = document.querySelector('.set-menu');
let settingsChevron = document.querySelector('.controlls .settings .chevron');
let mask = document.querySelector('.mask');
let eraseBtn = document.querySelector('.search_area .erase');
let body = document.querySelector('body');
let lastScroll = 0;
let header = document.querySelector('header');
//let links = document.querySelectorAll('a');
//let results = document.querySelector('header .search_results');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

document.onkeydown = function(event) {
    if (event.shiftKey) {
        searchInput.focus();
        header.classList.remove('hide');
    }
    if(searchInput.value.length > 0) {
        searchLabel.style.opacity = '0';
        searchLabel.style.left = '-10px';
        eraseBtn.style.display = 'flex';
    } else {
        searchLabel.style.opacity = '1';
        searchLabel.style.left = '0';
        eraseBtn.style.display = 'none';
    }
    if(event.code == 'Space') {
                window.scroll = event.preventDefault();
                playpauseTrack();
            }
            //if(event.code == 'ArrowRight') {
            //    window.scroll = event.preventDefault();
            //    let seekto = curr_track.duration * (seek_slider.value / 10000);
            //    curr_track.currentTime = seekto + 5.5;
            //    volume_slider = event.preventDefault();
            //}
            //if(event.code == 'ArrowLeft') {
            //    window.scroll = event.preventDefault();
            //    let seekto = curr_track.duration * (seek_slider.value / 10000);
            //    curr_track.currentTime = seekto - 5;
            //    volume_slider = event.preventDefault();
            //}
            if(event.code == 'ArrowUp') {
                window.scroll = event.preventDefault();
            }
            if(event.code == 'ArrowDown') {
                window.scroll = event.preventDefault();
            }
    if (event.ctrlKey && event.keyCode == 8) {
      searchInput.value = '';
    searchLabel.style.opacity = '1';
    searchLabel.style.left = '0';
    eraseBtn.style.display = 'none';
    searchInput.focus();
    }

};

searchInput.addEventListener('focus', () => {
    document.onkeydown = function(event) {
        if(event.code == 'Space') {
            event.stopPropagation();
        }
        //if(event.code == 'ArrowRight') {
        //    event.stopPropagation();
        //}
        //if(event.code == 'ArrowLeft') {
        //    event.stopPropagation();
        //}
        if(event.code == 'ArrowUp') {
            event.stopPropagation();
        }
        if(event.code == 'ArrowDown') {
            event.stopPropagation();
        }
    };
});

searchInput.addEventListener('blur', () => {
        document.onkeydown = function(event) {
            if(event.code == 'Space') {
                window.scroll = event.preventDefault();
                playpauseTrack();
            }
            //if(event.code == 'ArrowRight') {
            //    window.scroll = event.preventDefault();
            //    let seekto = curr_track.duration * (seek_slider.value / 10000);
            //    curr_track.currentTime = seekto + 5.5;
            //    volume_slider = event.preventDefault();
            //}
            //if(event.code == 'ArrowLeft') {
            //    window.scroll = event.preventDefault();
            //    let seekto = curr_track.duration * (seek_slider.value / 10000);
            //    curr_track.currentTime = seekto - 5;
            //    volume_slider = event.preventDefault();
            //}
            if(event.code == 'ArrowUp') {
                window.scroll = event.preventDefault();
            }
            if(event.code == 'ArrowDown') {
                window.scroll = event.preventDefault();
            }
            if (event.shiftKey) {
                searchInput.focus();
                header.classList.remove('hide');
            }
            };
        }
    );


document.onkeyup = function() {
    if(searchInput.value.length > 0) {
        searchLabel.style.opacity = '0';
        searchLabel.style.left = '-10px';
        eraseBtn.style.display = 'flex';
    } else {
        searchLabel.style.opacity = '1';
        searchLabel.style.left = '0';
        eraseBtn.style.display = 'none';
    }
    if (event.ctrlKey && event.keyCode == 39) {
      nextTrack();
    }
    
    if (event.ctrlKey && event.keyCode == 37) {
      prevTrack();
    }
};

eraseBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchLabel.style.opacity = '1';
    searchLabel.style.left = '0';
    eraseBtn.style.display = 'none';
    searchInput.focus();
});

searchInput.addEventListener('focus', () => {
    searchLabel.style.color = "var(--light)";
    searchIcon.style.fill = "var(--light)";
    searchRect.style.background = "var(--light)";
});

searchInput.addEventListener('blur', () => {
    searchLabel.style.color = "";
    searchIcon.style.fill = "";
    searchRect.style.background = "";
});

langBtn.addEventListener('click', () => {
    langBtn.classList.toggle('active');
    if(langBtn.classList.contains('active')) {
        langBtn.style.backgroundColor = 'var(--light-gray)';
        
    } else {
        langBtn.style.backgroundColor = '';
    }
    langSection.classList.toggle('active');
    setMenu.classList.remove('active');
    settingsBtn.classList.remove('active');
});

document.onkeyup = function() {
    if(searchInput.value.length > 0) {
        searchLabel.style.opacity = '0';
        searchLabel.style.left = '-10px';
        eraseBtn.style.display = 'flex';
    } else {
        searchLabel.style.opacity = '1';
        searchLabel.style.left = '0';
        eraseBtn.style.display = 'none';
    }
    if (event.ctrlKey && event.keyCode == 39) {
      nextTrack();
    }
    
    if (event.ctrlKey && event.keyCode == 37) {
      prevTrack();
    }
};

settingsBtn.addEventListener('click', () => {
   settingsBtn.classList.toggle('active');
    if(settingsBtn.classList.contains('active')) {
        settingsChevron.style.transform = 'rotate(180deg)';
        settingsBtn.style.backgroundColor = 'var(--light-gray)';
        
    } else {
        settingsChevron.style.transform = 'rotate(0)';
        settingsBtn.style.backgroundColor = '';
    }
    setMenu.classList.toggle('active');
    langSection.classList.remove('active');
    langBtn.classList.remove('active');
});

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide()) {
        //scroll down
        header.classList.add('hide');
        langSection.classList.remove('active');
        setMenu.classList.remove('active');
        langBtn.classList.remove('active');
        settingsBtn.classList.remove('active');
        searchInput.blur();
    }
    else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove('hide');
    }

    lastScroll = scrollPosition();
});



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Отменяем стандартное действие ссылки
            
            sessionStorage.setItem("lastPage", window.location.href); // Сохраняем текущий URL
            
            window.location.href = "404.html"; // Перенаправляем на страницу 404
        });
    });
});


