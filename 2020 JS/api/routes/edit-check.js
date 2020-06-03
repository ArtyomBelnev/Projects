const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');
mailer = require('../nodemailer');

router.post('/api/list/:id/edit', (req, res) => {
    const tasksData = getTasksFromDB2(),
        task = req.body;

    tasksData[0] = task;
    setTasksToDB2(tasksData);

    res.send(task);
});

router.get('/api/list/:id', (req, res) => {
    const tasksData = getTasksFromDB(),
        task = tasksData.find((task) => task.id === req.params.id);

    task ? res.send(task) : res.send({});
});

router.get('/api/list/:id/edit', (req, res) => {
    res.send(getTasksFromDB2());
});

router.put('/api/registration', (req, res) => {
    const movie = req.body,
        places = [];

    movie[0].forEach((vl) => {
        places.push(`Ряд ${vl.split('_').slice(0, 1)} Место ${vl.split('_').slice(1, 2)}`);
    });

    const message = {
        to: movie[1].mail,
        subject: 'Бронирование',
        html: `
        <h2>Поздравляю ${movie[1].name}, Вы успешно забронировали билеты на нашем сайте!</h2>
        <i>Ваши данные:</i>
        <ul>
        <li>Дата: ${movie[3].date}</li>
        <li>Начало: ${movie[3].times}</li>
        <li>Фильм: ${movie[3].title}</li>
        <li>Зал 1 : ${places}</li>
        <li>Сумма : ${movie[3].price.split(' ')[0] * movie[0].length} рублей</li>
        </ul>
        <h3>С уважение Кинотеатр Салют!</h3>
        <a href="http://localhost:9999/">Еще билетов ?)</a>
        `,
    };

    mailer(message);

    setTimeout(() => res.sendStatus(204), 1500);
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.info'), 'utf8'));
}

function getTasksFromDB2() {
    return JSON.parse(fs.readFileSync(config.get('database.movie'), 'utf8'));
}

function setTasksToDB2(tasksData) {
    fs.writeFileSync(config.get('database.movie'), JSON.stringify(tasksData));
}

module.exports = router;
