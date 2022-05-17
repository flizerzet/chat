(() => {
    "use strict";
    (function checkBrowser() {
        let currentBrowser;
        if (navigator.userAgent.indexOf("Firefox") > -1) currentBrowser = "firefox"; else if (navigator.userAgent.indexOf("Opera") > -1) currentBrowser = "opera"; else if (navigator.userAgent.indexOf("Trident") > -1) currentBrowser = "explorer"; else if (navigator.userAgent.indexOf("Edge") > -1) currentBrowser = "edge"; else if (navigator.userAgent.indexOf("Chrome") > -1) currentBrowser = "chrome"; else if (navigator.userAgent.indexOf("Safari") > -1) currentBrowser = "safari"; else currentBrowser = "unknown";
        console.log("You are using: " + currentBrowser);
        document.body.classList.add(currentBrowser);
    })();
    let functions_isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return functions_isMobile.Android() || functions_isMobile.BlackBerry() || functions_isMobile.iOS() || functions_isMobile.Opera() || functions_isMobile.Windows();
        }
    };
    (function checkMobile() {
        if (functions_isMobile.any()) document.body.classList.add("_mobile");
    })();
    (function isWebp() {
        function testWebP(callback) {
            var webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            if (true === support) document.querySelector("html").classList.add("_webp"); else document.querySelector("html").classList.add("_no-webp");
        }));
    })();
    document.body;
    const input = document.querySelector(".message-input");
    const script_button = document.querySelector("button");
    let hours = (new Date).getHours();
    let minutes = (new Date).getMinutes();
    1 == hours.toString().length ? hours = `0${hours}` : hours;
    1 == hours.toString().length ? minutes = `0${minutes}` : minutes;
    (function renderTime() {
        document.querySelector(".date").textContent = `Today at ${hours}:${minutes}`;
    })();
    function getWeekDay() {
        let days = [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ];
        return days[(new Date).getDay()];
    }
    function getMonth() {
        let months = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
        return months[(new Date).getMonth()];
    }
    const loadMessage = question => {
        const chatElements = [ {
            question: "привет!",
            answer: "Привет! Меня зовут Анжела! Вот список команд, которые доступны: привет!; расскажи шутку; который час?; как дела?; скинь картинку. В ответ на шутку можно посмеяться (ха-ха-ха). Рада знакомству!"
        }, {
            question: "расскажи шутку",
            answer: "Встретились как то два лысых. Абсолютно. Без бровей, ресниц, бороды, усов, даже в носу волос нету. Смотрят друг на друга и офигевают. Тут один говорит: «А я лысее тебя»\n-Почему?\n-А у меня голова больше."
        }, {
            question: "который час?",
            answer: `Сейчас ${(new Date).getHours()}:${(new Date).getMinutes()}, ${getWeekDay()}, ${(new Date).getDate()} ${getMonth()}`
        }, {
            question: "как дела?",
            answer: "Да по кайфу все :)"
        }, {
            question: "скинь картинку",
            answer: '<img src="https://loremflickr.com/220/140" />'
        }, {
            question: "ха-ха-ха",
            answer: "Я знала, что тебе понравится :)"
        } ];
        let ans = "Извини, я тебя не поняла :( Вот список досутпных команд: расскажи шутку; который час?; как дела?; скинь картинку";
        chatElements.forEach((dial => {
            if (dial.question === question) ans = dial.answer;
        }));
        return ans;
    };
    script_button.addEventListener("click", (() => {
        if ("" != input.value) {
            renderMessage("user", input.value);
            let text = input.value.toLowerCase();
            renderMessage("bot", loadMessage(text));
            input.value = "";
            document.querySelector(".messages").scrollTop = document.querySelector(".messages").clientHeight;
            setTimeout((() => {
                document.querySelector(".messages").scrollTop = document.querySelector(".messages").clientHeight;
            }), 1e3);
        }
    }));
    input.addEventListener("keyup", (e => {
        if ("Enter" === e.key || 13 === e.keyCode) {
            renderMessage("user", input.value);
            let text = input.value.toLowerCase();
            renderMessage("bot", loadMessage(text));
            input.value = "";
            document.querySelector(".messages").scrollTop = document.querySelector(".messages").clientHeight;
            setTimeout((() => {
                document.querySelector(".messages").scrollTop = document.querySelector(".messages").clientHeight;
            }), 1e3);
        }
    }));
    function renderMessage(sender, text) {
        const messagesContainer = document.querySelector(".messages");
        function updateMessage() {
            let hours = (new Date).getHours();
            let minutes = (new Date).getMinutes();
            1 == hours.toString().length ? hours = `0${hours}` : hours;
            1 == hours.toString().length ? minutes = `0${minutes}` : minutes;
            message.innerHTML = `\n\t\t<div class="message-avatar">\n\t\t\t<img src="img/${"user" === sender ? "user_avatar" : "bot_avatar"}.jpeg" alt="">\n\t\t</div>\n\t\t<div class="message-body">\n\t\t\t<div class="message-header">\n\t\t\t\t<div class="message-name">${"user" === sender ? "You" : "Bot Angela"}</div>\t\n\t\t\t</div>\n\t\t\t<div class="message-text">${renderedText}</div>\n\t\t\t<div class="message-time">${hours}:${minutes}</div>\n\t\t</div>\n\t\t`;
        }
        let message = document.createElement("div");
        message.classList.add("message");
        if ("user" === sender) message.classList.add("user-message"); else if ("bot" === sender) message.classList.add("bot-message");
        let renderedText;
        if ("bot" === sender) {
            renderedText = "<img src='img/g0R5.gif' style='width: 30px;'>";
            updateMessage();
            setTimeout((() => {
                renderedText = text;
                updateMessage();
            }), 1e3);
        } else {
            renderedText = text;
            updateMessage();
        }
        messagesContainer.appendChild(message);
    }
})();