'use strict';

let regExp = /^\w+@\w+\.\w{2,}$/;

let servHTTP = (url, callback) => {
    let request = new XMLHttpRequest();
    request.open ('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.status === 200 && request.readyState == 4) {
            const objProd = JSON.parse(request.response);
            callback(objProd);
        };
    });
};

const buttonSigin = document.querySelector('.button_sigin');
const modalAuthElem = document.querySelector('.modal-auth');
const closeAuthButton = document.querySelector('.close-auth');
const logInFormElem = document.querySelector('#logInForm');
const loginText = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const restAboutHeader = document.querySelector('.rest_about_header');
const price = document.querySelector('.price');
const category = document.querySelector('.category');
const starsRest = document.querySelector('.stars_rest');
const buttonBasket = document.querySelector('.button_basket');
const cardRestMenuElem = document.querySelector('.card_rest_menu');

const modal = document.querySelector('.modal');
const modalTitleButton = document.querySelector('.modal_title_button');
const modalList = document.querySelector('.modal_list');
const modalButtonBuyPrice = document.querySelector('.modal_button_buy_price');
const modalButtonCancel = document.querySelector('.modal_button_buy_cancel');

let basket = [];
    
let openBusket = () => {
    modal.classList.add('active');
    document.body.style.overflowY = 'hidden';

    modalTitleButton.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflowY = '';
    });
};

let openCloseModal = () => {
    modalAuthElem.classList.toggle('is-open');
    modalAuthElem.classList.contains('is-open') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = '';
};

let user = localStorage.getItem('FirstUser');

let authorized = () => {
    let logOut = () => {
    user = null;
    buttonSigin.style.display = 'flex';
    userName.style.display = '';
    buttonBasket.style.display = '';
    buttonOut.style.display = '';
    userName.textContent = '';  
    buttonOut.removeEventListener('click', logOut);
    localStorage.removeItem('FirstUser');
    logInFormElem.reset();
    checkAuth();
};

    buttonSigin.style.display = 'none';
    userName.style.display = 'inline-flex';
    buttonOut.style.display = 'flex';
    userName.textContent = user;    
    buttonBasket.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
};

let noAuthorized = () => {  
    let logIn = (event) => {
        event.preventDefault(); 

        if (!regExp.test(loginText.value)) {
            alert('Введен некорректный email');
            logInFormElem.reset();
        } else {
            user = loginText.value;
            localStorage.setItem('FirstUser', user);
            checkAuth();
            openCloseModal();
            closeAuthButton.removeEventListener('click', openCloseModal);
            logInFormElem.removeEventListener('submit', logIn);    
        };
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

let createCardRest = (elem) => {
    const cardsRest = document.querySelector('.cards_rest');
    const promoElem = document.querySelector('.promo_contant');
    const logo = document.querySelector('.logo_img');
    const headTitleRest = document.querySelector('.head_title_rest');
    const headSearchRest = document.querySelector('.head_search_rest');

    let card = '';

    for (let i = 0; i < 6; i++) {
        card = `
        <a class="card animate__animated animate__fadeInUp wow" data-name="${elem[i].products}">
                        <img src="${elem[i].image}" class="img_card">
                        <div class="rest_about">
                            <div class="rest_about_text">
                                <div class="rest_name">
                                    <h3 class="title_name_rest">${elem[i].name}</h3>
                                    <span class="about_time_delivery">${elem[i].time_of_delivery} мин</span>
                                </div>
                                <div class="rest_rating">
                                <img src="/img/srars.svg" alt="">
                                    <span class="stars_rest">${elem[i].stars} </span>
                                    <div class="category_and_price price">От ${elem[i].price} ₽</div>
                                    <div class="category_and_price category">${elem[i].kitchen}</div>
                                </div>
                            </div>
                        </div>
                    </a>
    `;

    cardsRest.insertAdjacentHTML('afterbegin', card);
    };

    let restMenu = (event) => {
        let createRestMenu = (elem) => {
            let menu = '';

            for (let i = 0; i < 6; i++) {
                menu += `
                <div class="card" data-id = "${elem[i].id}" >
                        <img src="${elem[i].image}" alt="" class="img_card">
                        <div class="rest_about">
                            <div class="rest_about_text">
                                <div class="rest_name title_food">
                                    <h3 class="title_name_food">${elem[i].name}</h3>
                                </div>
                                <div class="rest_rating">
                                    <div class="about_food">${elem[i].description}</div>
                                </div>
                            </div>
                        </div>
                        <div class="price_button_food">
                            <button class="button_food">В корзину</button>
                            <div class="price_food">${elem[i].price} ₽</div>
                        </div>
                    </div>
                `

                cardRestMenuElem.innerHTML = menu;
            };
        };

         let target = event.target;
         let targetCard = target.closest('.card');

         if (targetCard) {
            if (!user) {
                openCloseModal();
            } else {
            let textMenuRest = targetCard.querySelector('.title_name_rest');
            let textPrice = targetCard.querySelector('.price');
            let numStarsText = targetCard.querySelector('.stars_rest');
            let categoryText = targetCard.querySelector('.category');
            let arr = targetCard.dataset.name;

            headTitleRest.textContent = textMenuRest.textContent;
            cardsRest.style.display = 'none';
            cardRestMenuElem.style.display = 'flex';   
            promoElem.style.display = 'none';
            headSearchRest.style.display = 'none';
            restAboutHeader.style.display = 'flex';
            price.textContent = textPrice.textContent;
            starsRest.textContent = numStarsText.textContent;
            category.textContent = categoryText.textContent;
            servHTTP(`db/${arr}`, createRestMenu);
            };
         };

         buttonOut.addEventListener('click', () => {
            cardsRest.style.display = '';
            cardRestMenuElem.style.display = 'none';   
            promoElem.style.display = '';
            headSearchRest.style.display = '';
            restAboutHeader.style.display = '';
            headTitleRest.textContent = 'Рестораны'
         });

         logo.addEventListener('click', () => {
            cardsRest.style.display = '';
            cardRestMenuElem.style.display = 'none';   
            promoElem.style.display = '';
            headSearchRest.style.display = '';
            restAboutHeader.style.display = '';
            headTitleRest.textContent = 'Рестораны'
        });
    };

    cardsRest.addEventListener('click', restMenu);
};

let formBasket = (event) => {
    const target = event.target;
    const card = target.closest('.card');

    if (card && target.closest('.button_food')) {
        const price = card.querySelector('.price_food').textContent;
        const nameFood = card.querySelector('.title_name_food').textContent;
        const idFood = card.dataset.id; 
        console.log(basket);
        
        const food = (basket.find((item)=> {
            return item.idFood === idFood;
        }));

        if (!food) {
            basket.push({price: price.substring(0, price.indexOf('₽')).trim(), nameFood, idFood, count:1});  
        } else {
            basket.forEach((elem) => {
                if (elem.idFood == idFood) {
                elem.count += 1;
                }
            });
        };
        renderBusket();
    };
};

let renderBusket = () => { 
    modalList.replaceChildren();
    basket.forEach(({price, nameFood, count, idFood}) => {
        const text =  `
                <li class="modal_list_item" >
                    <div class="modal_list_text">${nameFood}</div>
                    <div class="modal_list_price">${price} ₽</div>
                    <div class="modal_list_buttons">
                        <button type="button" class="modal_list_buttons_minus" data-counter="${idFood}">-</button>
                        <span class="modal_list_buttons_number">${count}</span>
                        <button type="button" class="modal_list_buttons_plus" data-counter="${idFood}">+</button>
                    </div>
                </li>
        `;

        modalList.insertAdjacentHTML('beforeend', text);
    });

    const sum = basket.reduce((elem, item) => {
        return elem + parseFloat(item.price) * item.count;
    }, 0);

    modalButtonBuyPrice.textContent = sum + ' ₽';
};

let counterChange = (event) => {
    const target = event.target;

    if (target.classList.contains('modal_list_buttons_minus')) {
        const food = basket.find((item) => {
            return target.dataset.counter === item.idFood;
        });

        if (food.count > 0) {
            food.count--;
        };
        
        if (food.count == 0) { 
            basket.splice(basket.indexOf(food), 1);
        };

        renderBusket();
    };

    if (target.classList.contains('modal_list_buttons_plus')) {
        const food = basket.find((item) => {
            return target.dataset.counter === item.idFood;
        });

        food.count++;
        renderBusket();
    };
};

let init = () => {
    new WOW().init();
    servHTTP('db/partners.json', createCardRest);
    new Swiper('.swiper-container',  {
        loop: true,
        autoplay: {
            delay: 4000,
        },
        speed: 700
    });

    cardRestMenuElem.addEventListener('click', formBasket);
    buttonBasket.addEventListener('click', () => {  
        openBusket();
        modalButtonCancel.addEventListener('click', () => {
            modalList.replaceChildren();    
            modalButtonBuyPrice.textContent = 0;
            basket.length = 0;
        });
    });
    modalList.addEventListener('click', counterChange)
};

init();