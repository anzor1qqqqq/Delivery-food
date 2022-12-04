let modal = () => {
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

modal();

new WOW().init();