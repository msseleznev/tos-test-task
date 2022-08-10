# ТЗ front-end developer

- Необходимо написать приложение личный кабинет.
- В приложении должно быть две страницы - страница входа и страница со списком контактов.
- Оформление и данные для заполнения страниц на усмотрение кандидата.
- Задание необходимо выполнить на TypeScript, без использования any и ts-ignore.
- При выполнении работы обязательно использовать стейт менеджер (redux, mobx).
- Время на выполнение тестового задания не ограничено.

### Страница входа
- Для реализации авторизации можно использовать запросы с моковыми данными https://github.com/typicode/json-server.
### Страница со списком контактов
- Страница со списком контактов пользователя должна быть доступна только после авторизации.
- На странице со списком контактов должна быть возможность добавлять/удалять/редактировать контакты, а также желательно наличие функции поиска.

---

### Для проверки задания:

---

> node 16.10.0
```
git clone https://github.com/msseleznev/tos-test-task.git
cd tos-test-task
yarn
yarn start
login: admin
password: admin
```
