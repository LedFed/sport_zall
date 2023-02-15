const accoridon = () => {
    const characteristicsList = document.querySelector('.characteristics__list');
    const characteristicsItem = document.querySelectorAll('.characteristics__item');
    // Функция принимает кнопку на которую нажал и описание 
    const open = (button, dropDown) => {
        CloseAllDrops();
        dropDown.style.height = dropDown.scrollHeight + 'px'; //Устанавливаем высоту зависима от наполнения 
        button.classList.add('active');
        dropDown.classList.add('active');
    };
    const close = (button, dropDown) => {
        button.classList.remove('active');
        dropDown.classList.remove('active');
        dropDown.style.height = '';
    };
    // Закрываем все элементы кроме того на который нажали не т 
    const CloseAllDrops = (button, dropDown) => {
        characteristicsItem.forEach((elem) => {
            if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                close(elem.children[0], elem.children[1]);
            }
        })
    }
    // Отслиживаем клик
    characteristicsList.addEventListener('click', (event) => {
        const target = event.target; //Помещаем в переменную класс по которому тыкнули(строго внтри list)
        if (target.classList.contains('characteristics__title')) {
            const parent = target.closest('.characteristics__item');
            const disription = parent.querySelector('.characteristics__description')
            disription.classList.contains('active') ?
                close(target, disription) :
                open(target, disription)
        }
    });
    // Если я тыкнул мимо списка, то вызываем функцию которая все закроет
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.characteristics__list')) {
            CloseAllDrops();
        }
    })
};

$(document).ready(function () {
    $('.pupaps').magnificPopup({
        type: 'image',
        gallery: {
            // options for gallery
            enabled: true
        },
        // other options
    });
});

const header = document.querySelector('.navig_fix');
const first = document.querySelector('.inner');
let burger = document.querySelector('.menu--3');
let checker = burger.querySelector('input[type=checkbox]');


window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    console.log(scrollDistance);

    if (parseInt(scrollDistance) >= 450) {
        header.classList.add('fixed')
        // conteiner.classList.add('crice')
    } else {
        header.classList.remove('fixed')
        first.style.marginTop = null;
    }
})

burger.addEventListener('change', () => {
    event.preventDefault();
    // if (checker.checked !== false) {
        // navigation.classList.toggle('active');
        // burger.classList.toggle('active');
        header.classList.toggle('active');

        document.body.style.overflow = 'hidden'
        if(!checker.checked) {
            checker.checked = false;
            document.body.style.removeProperty('overflow');
        }
    
})

accoridon();