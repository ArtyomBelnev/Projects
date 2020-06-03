import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import Form from './form';

import EditTemplate from '../../../../templates/pages/tasks/edit';
import Error404Template from '../../../../templates/pages/error404';

class Edit extends Component {
    constructor() {
        super();
        this.model = new Tasks();
        this.getLS;
        this.task;
    }

    getData() {
        return new Promise((resolve) =>
            this.model.getTask(this.request.id).then((task) => {
                this.task = task;

                resolve(task);
            })
        );
    }

    render(task) {
        return new Promise((resolve) => resolve(Object.keys(task).length ? EditTemplate({ task }) : Error404Template()));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const countTickets = document.getElementsByClassName('form__ticket-price')[0],
            butCancel = document.getElementsByClassName('form__buttons-cancel')[0],
            butNext = document.getElementsByClassName('form__buttons-next')[0],
            botTextTable = document.getElementsByClassName('table_text')[0],
            secContainer = document.getElementsByClassName('seconds')[0],
            minContainer = document.getElementsByClassName('minutes')[0],
            table = document.getElementById('table_ticket'),
            сheckbox = document.getElementById('checkbox'),
            tdList = document.querySelectorAll('td'),
            mail = document.getElementById('mail'),
            name = document.getElementById('name'),
            movie = this.task;

        const form = new Form(movie, table, tdList, countTickets, mail, name, сheckbox, botTextTable, secContainer, minContainer);

        table.addEventListener('click', form.changeTable.bind(form));
        сheckbox.addEventListener('click', form.getCheckbox.bind(form));
        butCancel.addEventListener('click', form.cancelForm.bind(form));
        butNext.addEventListener('click', form.nextForm.bind(form));

        window.onbeforeunload = () => form.resetWindows();

        window.addEventListener('hashchange', form.changeWindows.bind(form));

        if (location.href) {
            this.model.getTasksCloseMovie(this.request.id).then((task) => form.recoveryForm(task));
            form.startTimer();
        }
    }
}

export default Edit;
