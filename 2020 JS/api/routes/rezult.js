const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.post('/api/list/:id/edit/check/rezult', (req, res) => {
    const tasksData = getTasksFromDB3(),
        task = req.body;

    tasksData.push(task);
    setTasksToDB3(tasksData);
    setTimeout(() => res.send(task), 700);
    // res.send(task);
});

router.get('/api/list/:id/edit/check/rezult', (req, res) => {
    const tasksData = getTasksFromDB3(),
        task = tasksData.find((task) => task.id === req.params.id);

    task ? res.send(task) : res.send([]);
});

router.put('/api/list/:id/edit/check/rezult', (req, res) => {
    const tasksData = getTasksFromDB3(),
        task = tasksData.find((task) => task.id === req.params.id),
        updatedTask = req.body,
        id = req.params.id;

    task[`${id}`] = updatedTask[`${id}`];

    setTasksToDB3(tasksData);

    res.sendStatus(204);
});

function getTasksFromDB3() {
    return JSON.parse(fs.readFileSync(config.get('database.movie_close'), 'utf8'));
}

function setTasksToDB3(tasksData) {
    fs.writeFileSync(config.get('database.movie_close'), JSON.stringify(tasksData));
}

module.exports = router;
