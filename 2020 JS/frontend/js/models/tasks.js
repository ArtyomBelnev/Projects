class Tasks {
    getTasksList() {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/list', true);

            xhr.onload = () => {
                try {
                    resolve(JSON.parse(xhr.response));
                } catch (e) {
                    resolve([]);
                }
            };

            xhr.send();
        });
    }

    getTasksMovie(id) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/list/${id}/edit`, true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    addTask(newTask, id) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `http://localhost:3000/api/list/${id}/edit`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(newTask));
        });
    }

    getTask(id) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/list/${id}`, true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    addCloseMovie(newTask, id) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `http://localhost:3000/api/list/${id}/edit/check/rezult`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(newTask));
        });
    }

    getTasksCloseMovie(id) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/list/${id}/edit/check/rezult`, true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    editTaskCloseMovie(updatedTask) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/list/${updatedTask.id}/edit/check/rezult`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(updatedTask));
        });
    }

    addMail(newTask) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/registration`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(newTask));
        });
    }
}

export default Tasks;
