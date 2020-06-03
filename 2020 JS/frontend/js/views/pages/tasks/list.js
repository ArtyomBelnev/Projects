import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import ListTemplate from '../../../../templates/pages/tasks/list';
import TaskTemplate from '../../../../templates/pages/tasks/task';

class List extends Component {
    constructor() {
        super();
        this.model = new Tasks();
        this.tasks;
    }

    getData() {
        return new Promise((resolve) =>
            this.model.getTasksList().then((tasks) => {
                resolve(tasks);
            })
        );
    }

    render(tasks) {
        this.tasks = tasks;
        return new Promise((resolve) => resolve(ListTemplate({ tasks })));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const tasksContainer = document.getElementsByClassName('tasks')[0],
            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0];

        tasksList.insertAdjacentHTML('beforeEnd', TaskTemplate(this.tasks));
    }
}

export default List;
