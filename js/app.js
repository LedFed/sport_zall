document.addEventListener("DOMContentLoaded", () => {
    "use strict"
    // event.preventDefault();
    let lastScroll = 0;
    const header = document.querySelector('.hed2');
    let all = document.querySelector('.all');
    // let hed = document.querySelectorAll('header');
    // console.log(hed);
    let burger = document.querySelector('.menu');
    let navigation = document.querySelector('.header_item');
    let checker = burger.querySelector('input[type=checkbox]');

    burger.addEventListener('change', () => {
        event.preventDefault();
        navigation.classList.toggle('active');
        burger.classList.toggle('active');
        header.classList.toggle('active')
        navigation.childNodes.forEach(e => {
            e.addEventListener('click', () => {
                navigation.classList.remove('active');
                burger.classList.remove('active');
                checker.checked = false;
                header.classList.remove('active')
            })
        });
    })

    all.addEventListener('scroll', () => {

        let scrollDistance = parseInt(all.scrollTop);
        if (scrollDistance <= lastScroll && !header.classList.contains('fixed')) {
            header.classList.add('fixed');


        } else if (scrollDistance > lastScroll && header.classList.contains('fixed')) {
            header.classList.remove('fixed')
        }

        (scrollDistance >= 350) ?
            lastScroll = scrollDistance
            : lastScroll = -300;
    })

    $(window).ready(function () {
        $("[data-slider]").slick({
            isFinite: false,
            fade: true,
            infinite: false,
            slideToShow: 1,
            slideToScroll: 1,
            arrows: true,
            dots: true,
            autoplay: false,
            appendDots: '.route',
            appendArrows: '.arrows_block',
            arrowsClass: 'progress',
            dotsClass: 'progress',
        });
    });

    // const track = document.getElementById(".price_item");

    // let track = document.querySelector('.price_item');

    // const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    // const handleOnUp = () => {
    //     track.dataset.mouseDownAt = "0";
    //     track.dataset.prevPercentage = track.dataset.percentage;
    // }

    // const handleOnMove = e => {
    //     if (track.dataset.mouseDownAt === "0") return;

    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    //         maxDelta = window.innerWidth;

    //     const percentage = (mouseDelta / maxDelta) * -100,
    //         nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    //         nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    //     track.dataset.percentage = nextPercentage;

    //     track.animate({
    //         transform: `translate(${nextPercentage}%, 0%)`
    //     }, { duration: 1200, fill: "forwards" });

    //     for (const image of track.getElementsByClassName("price_items")) {
    //         image.animate({
    //             backgroundPosition: `${100 + nextPercentage}% center`
    //         }, { duration: 1200, fill: "forwards" });
    //     }
    // }

    // /* -- Had to add extra lines for touch events -- */

    // track.onmousedown = e => handleOnDown(e);

    // track.ontouchstart = e => handleOnDown(e.touches[0]);

    // track.onmouseup = e => handleOnUp(e);

    // track.ontouchend = e => handleOnUp(e.touches[0]);

    // track.onmousemove = e => handleOnMove(e);

    // track.ontouchmove = e => handleOnMove(e.touches[0]);

    //Принимает два параметра функцию и опцию '0,7'
    window.onload = function () {
        document.querySelector('.preloader').classList.add("preloader-remove");
        document.querySelector('.preloader_con').classList.add("preloader-remove");
    };
    // Активный бар 
    const observer = new IntersectionObserver((entry) => {
        entry.forEach((entryes) => {
            // Если элемент пересекает
            if (entryes.isIntersecting) {
                //Находим все ссылки в QS и сравниваем с переданой секцией(entryes) если ок то выдаем класс active
                document.querySelectorAll('.smart_link').forEach((link) => {
                    link.classList.toggle('active',
                        link.getAttribute('href').replace('#', '') === entryes.target.id)
                })
            }
        })
    }, {
        threshold: .7,
        rootMargin: '70px',
    });

    // Тут мы нашли все наши секции и перебираем их вызывая для каждого элемента observer
    document.querySelectorAll('.section').forEach((section) => {
        observer.observe(section);
    })

    // Вешаем обработчик на все ссылки 
    document.querySelector('.header_item').addEventListener('click', (event) => {
        // Если ссылка есть по клику то получаем ее href без "#" 
        if (event.target.classList.contains('smart_link')) {
            // event.preventDefault();
            // const id = getId(event.target)
            const id = event.target.getAttribute('href').replace('#', '');
            console.log(document.getElementById(id).offsetTop);
            console.log(event);
            // Скролимся к блоку 
            window.scrollTo({
                top: document.getElementById(id).offsetTop - 30,
                behavior: 'smooth',

            })
        }
    })

    // --МАСКА для обратной связи name tel 
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');
    let nameInputs = document.querySelector('input[data-name-input]');
    let btnOrder = document.querySelector('.order_btn ');

    //Просто добавь input > [data-tel-input] и type='tel' и подключи этот скрипт и все !!!
    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        examination();
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }
        examination();

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let examination = () => {
        if (nameInputs.value.length >= 4 && phoneInput.value.length >= 17) {
            console.log('Прошло');
            btnOrder.classList.remove('disable');
            btnOrder.disabled = false;
        } else {
            btnOrder.classList.add('disable');
            btnOrder.disabled = true;
        }
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        examination();
        var inputValue = e.target.value.replace(/\D/g, '');
        console.log();
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
        nameInputs.addEventListener('keydown', examination);
        nameInputs.addEventListener('input', examination, false);
        nameInputs.addEventListener('paste', examination, false);
    }
    // --ПЛАВНОЕ появление элементов 
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('show');
            }
        });
    }
    let options = { threshold: [0.5] };
    let observers = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.animate');
    for (let elm of elements) {
        observers.observe(elm);
    }

    const accoridon = () => {
        const characteristicsList = document.querySelector('.accordion');
        console.log(characteristicsList);
        const characteristicsItem = document.querySelectorAll('.accordions');

        const open = (dropDown) => {
            CloseAllDrops(dropDown);
            dropDown.style.height = dropDown.scrollHeight + 'px'; //Устанавливаем высоту 
            dropDown.classList.add('active');
        };

        const close = (dropDown) => {
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };
        // Закрываем все элементы кроме того на который нажали не т 
        const CloseAllDrops = (dropDown) => {
            characteristicsItem.forEach((elem) => {
                if (elem.children[0] !== dropDown) {
                    close(elem.children[0]);
                }
            })
        }
        // Отслиживаем клик
        characteristicsList.addEventListener('click', (event) => {
            const target = event.target; //Помещаем в переменную класс по которому тыкнули(строго внтри list)
            if (target.classList.contains('accordions_title')) {
                console.log(target);
                const parent = target.closest('.accordions');
                const disription = parent.querySelector('.accordions_text')
                disription.classList.contains('active') ?
                    close(disription) :
                    open(disription)
            }
        });
        // Если я тыкнул мимо списка, то вызываем функцию которая все закроет
        // document.body.addEventListener('click', (event)=> {
        //     const target = event.target;
        //     if(!target.closest('.accordions')){
        //         CloseAllDrops();
        //     }
        // })
        // Тоже табы который написал сам и они работают не закрывая открытые
        // const accardionBtn = document.querySelectorAll('.characteristics__title');
        // accardionBtn.forEach((el) =>{     
        //     el.addEventListener('click',() => {         
        //         el.classList.toggle('active');
        //         el.nextElementSibling.classList.toggle('active');
        //     })
        // })
    };


    // accoridon();

    const items = document.querySelectorAll(".accordion button");
    
    function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');
        }

        if (itemToggle == 'false') {
            this.setAttribute('aria-expanded', 'true');
        }
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));

})



