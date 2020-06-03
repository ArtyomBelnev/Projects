const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/list', (req, res) => {
    const tasksData = getTasksFromDB();

    if (tasksData.length === 0) {
        res.sendStatus(500);
    } else {
        res.send(tasksData);
    }
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.info'), 'utf8'));
}

module.exports = router;
