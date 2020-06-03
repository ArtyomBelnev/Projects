import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import RezultTemplate from '../../../../templates/pages/tasks/rezult';
import Error404Template from '../../../../templates/pages/error404';

class Rezult extends Component {
    constructor() {
        super();
        this.model = new Tasks();
        this.getLS;
        this.getCloseMovie;
    }

    getData() {
        return new Promise((resolve) =>
            this.model.getTasksMovie(this.request.id).then((task) => {
                resolve(task);
            })
        );
    }

    render(task) {
        this.getLS = task[0];
        let template;

        this.isStatusEnable() ? template = RezultTemplate(): template = Error404Template();

        return new Promise((resolve) => resolve(template));
    }

    afterRender() {
        this.isStatusEnable() && this.setActions();
    }

    isStatusEnable() {
        return this.getLS.length === 6 ? true : false;
    }

    setActions() {
        this.model.getTasksCloseMovie(this.request.id).then((task) => this.getClose(task));
    }

    getClose(task) {
        this.getCloseMovie = task[`${this.request.id}`];
        if (task.length === 0) {
            this.model.addCloseMovie(
                {
                    id: this.request.id,
                    [`${this.request.id}`]: this.getLS[0],
                },
                this.request.id
            );
            this.model.addTask([], this.request.id);
        } else {
            this.model.getTasksMovie(this.request.id).then((task) => {
                this.getNewClose(task);
            });
        }
    }

    getNewClose(task) {
        task[0][0].forEach((el) => {
            this.getCloseMovie.push(el);
        });
        this.model.editTaskCloseMovie({
            id: this.request.id,
            [`${this.request.id}`]: this.getCloseMovie,
        });
        this.model.addTask([], this.request.id);
    }
}

export default Rezult;
