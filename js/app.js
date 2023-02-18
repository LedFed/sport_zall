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

console.log(header.querySelectorAll('.header_item'));


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
    header.classList.toggle('active');

    document.body.style.overflow = 'hidden'
    if (!checker.checked) {
        checker.checked = false;
        document.body.style.removeProperty('overflow');
    }
    header.querySelectorAll('.header_item').forEach(e => {
        e.addEventListener('click', () => {
            burger.classList.remove('active');
            checker.checked = false;
            header.classList.remove('active')
            document.body.style.removeProperty('overflow');
        })
    });

})

//Принимает два параметра функцию и опцию '0,7'
const observer = new IntersectionObserver((entry) => {
    entry.forEach((entryes) => {
        // Если элемент пересекает
        if (entryes.isIntersecting) {
            //Находим все ссылки в QS и сравниваем с переданой секцией(entryes) если ок то выдаем класс active
            document.querySelectorAll('.header_links').forEach((link) => {
                link.classList.toggle('active',
                    link.getAttribute('href').replace('#', '') === entryes.target.id)
            })
        }
    })
}, {
    threshold: 1.0,
    rootMargin: '290px',
});
// Тут мы нашли все наши секции и перебираем их вызывая для каждого элемента observer
document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
})

// Вешаем обработчик на все ссылки 
document.querySelector('.header_item').addEventListener('click', (event) => {
    // Если ссылка есть по клику то получаем ее href без "#" 
    if (event.target.classList.contains('header_links')) {
        event.preventDefault();
        // const id = getId(event.target)
        const id = event.target.getAttribute('href').replace('#', '');
        // console.log(document.getElementById(id).offsetTop);
        // console.log(1);
        // Скролимся к блоку 
        window.scrollTo({
            top: document.getElementById(id).offsetTop - 30,
            behavior: 'smooth',

        })
    }
})

let infBtn = document.querySelector('.inf_ic');

infBtn.addEventListener('click', () => {
    // infBtn.classList.toggle('active');
    infBtn.previousElementSibling.classList.toggle('active');
})
accoridon();
