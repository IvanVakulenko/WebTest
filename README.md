﻿# Тестовий веб-сайт MERN

Це веб-сайт, розроблений на стеку MERN, який дозволяє користувачам проходити різноманітні тести та відповідати на запитання.

## Опис

Цей веб-сайт призначений для створення, проходження і управління тестами. Він надає користувачам можливість:

- Реєстрації та авторизації на сайті.
- Створення власних тестів та питань для них.
- Проходження тестів і перевірку правильних відповідей.
- Перегляд результатів і статистики.

## Основні функції

- Реєстрація та авторизація користувачів.
- Створення тестів з можливістю додавання питань і відповідей.
- Проходження тестів з можливістю вибору правильних відповідей.
- Відображення результатів і статистики проходження тестів.

## Вимоги до встановлення

Перед встановленням цього веб-сайту впевніться, що ви маєте наступне ПЗ встановлене на своєму комп'ютері:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Встановлення

1. Клонуйте репозиторій:

```bash
git clone https://github.com/IvanVakulenko/WebTest.git
```

2. Перейдіть до папки проекту

3. Встановіть залежності для клієнта та сервера:

- cd backend 
- npm install
- cd fronted
- npm install

4. Змінити axios запроси на посиланням http://localhost:5555 для використання серверної частини

5. запустіть окремо сервер та клієнт в двух терміналах:

- cd backend 
- npm run dev
- cd fronted
- npm run dev


6. Відкрийте браузер та перейдіть за посиланням http://localhost:5173 для використання веб-сайту.
