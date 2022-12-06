let modalBasket = () => {
    const buttonBasketElem = document.querySelector('.button_basket');
    const modal = document.querySelector('.modal');
    const modalTitleButton = document.querySelector('.modal_title_button');

    buttonBasketElem.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflowY = 'hidden';
    });

    modalTitleButton.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflowY = '';
    });
};

let modalAuth = () => {
    const buttonSigin = document.querySelector('.button_sigin');
    const modalAuthElem = document.querySelector('.modal-auth');
    const closeAuthButton = document.querySelector('.close-auth');
    const logInFormElem = document.querySelector('#logInForm');
    const loginText = document.querySelector('#login');
    const passwordText = document.querySelector('#password');
    const userName = document.querySelector('.user-name');
    const buttonOut = document.querySelector('.button-out');

    let openCloseModal = () => {
        modalAuthElem.classList.toggle('is-open');
        modalAuthElem.classList.contains('is-open') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = '';
    };

    let user = localStorage.getItem('FirstUser');

    let authorized = () => {
        console.log('Авторизован');

        let logOut = () => {
            user = null;
            buttonSigin.style.display = 'flex';
            userName.style.display = '';
            buttonOut.style.display = '';
            userName.textContent = '';    
            buttonOut.removeEventListener('click', logOut);
            localStorage.clear();
            logInFormElem.reset();
            checkAuth();
        };

        buttonSigin.style.display = 'none';
        userName.style.display = 'inline-flex';
        buttonOut.style.display = 'flex';
        userName.textContent = user;    

        buttonOut.addEventListener('click', logOut);
    };

    let noAuthorized = () => {  
        console.log('Не авторизован');

        let logIn = (event) => {
            event.preventDefault(); 
            if (loginText.value != '') {
                user = loginText.value;
                localStorage.setItem('FirstUser', user);
                checkAuth();
                openCloseModal();
                closeAuthButton.removeEventListener('click', openCloseModal);
                logInFormElem.removeEventListener('submit', logIn);
            } else {
                alert('Введите логин');
            }
        };

        buttonSigin.addEventListener('click', openCloseModal);
        closeAuthButton.addEventListener('click', openCloseModal);
        logInFormElem.addEventListener('submit', logIn);
    };

    let checkAuth = () => {
        if (user) {
            authorized();
        } else {
            noAuthorized();
        };
    };

    checkAuth();
};



modalAuth();
modalBasket();
new WOW().init();