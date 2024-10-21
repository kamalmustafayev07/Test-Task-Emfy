# Test-Task-Emfy

ACCOUNT : https://temple23062gmailcom.amocrm.ru/

**ЗАДАНИЕ :**
Подготовка:
Зарегистрировать аккаунт в https://www.amocrm.ru/ Зайти в раздел амоМаркет (/amo-market/).Нажать на 3 точки в правом верхнем углу - создать "Внешнюю интеграцию" для доступа к amoCRM по API. Документация по созданию интеграций, методам API и получению ключей oAuth - https://www.amocrm.ru/developers/
Получить access_token для доступа по API к аккаунту amoCRM можно с помощью authorization_code во вкладке "Ключи и доступы" во вновь созданной интеграции. Для этого достаточно отправить необходимые запросы на получение access_token из консоли разработчика. Далее необходимо в разделе "Сделки" создать минимум 10 сделок, в которых поле "Бюджет" заполнить случайными суммами (сделать вручную, а не по API), а также добавьте к каждой сделке по задаче, датой указав один из следующих вариантов(каждый должен встретится минимум 1 раз среди всех сделок): Вчера, Сегодня, Завтра. После этого разработать скрипт для выполнения тестового задания.

Тестовое задание:
ВАЖНО. Тестовое задание должно быть выполнено полностью на frontend в виде отдельно сверстанной страницы без использования backend.
Для обхода CORS-политики можете использовать локальный или внешний прокси сервер, либо плагин для браузера.
1. Сверстайте основную страницу вашего проекта. Она должна быть выполнена в виде таблицы со сделками.
2. Далее вам необходимо получить все созданные карточки по API и вывести их на
созданную вами страничку. Достаточно вывести только название, бюджет и id.
3. При обращении к API получайте не более 3х карточек раз в секунду. Это очень важно,
так как amoCRM имеет ограничение. Несомненно, оно больше чем 3 карточки, но это
нужно для проверки навыков.
4. При нажатии на карточку, выводит на месте карточки загрузку и получаем
развернутые данные по API.
При этом, если есть открытая карточка, то она должна закрываться.
После получения данных от сервера убираем спиннер и вставляем в эту же карточку
название, id, дату в формате DD.MM.YYYY, статус ближайщей задачи.
Статус должен является тегом svg и представлять собой раскрашенный в цвет статуса
круг:
Если нет задачи или она просрочена(поставлена на вчера), то круг должен быть красным.
Если задача будет в этот день, то зеленым.
Если более чем через день, то желтым.

**ЗАПУСК ПРИЛОЖЕНИЯ :**
Для запуска приложение нужно

1)Открыть терминал.Написать следуюшие две команды по очереди

    cd proxy-server
    npm install
    node server

2)Открыть второй терминал.Написать следующие две команды по очереди

    cd test-task
    npm install
    npm run dev

3)Далее нажать на ссылку.


    
