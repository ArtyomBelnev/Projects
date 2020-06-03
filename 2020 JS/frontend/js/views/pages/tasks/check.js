import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import СheckTemplate from '../../../../templates/pages/tasks/check';
import СheckTicketsTemplate from '../../../../templates/pages/tasks/check-tickets';
import Error404Template from '../../../../templates/pages/error404';

class Check extends Component {
    constructor() {
        super();
        this.model = new Tasks();
        this.counter = 0;
        this.getLsMovie;
        this.getLS;
    }

    getData() {
        return new Promise((resolve) => this.model.getTasksMovie(this.request.id).then((task) => resolve(task)));
    }

    render(task) {
        this.getLS = task[0];
        const infoLs = this.getLS[1];

        let template;

        if (this.isStatusEnable()) {
            template = СheckTemplate({ infoLs, urlLs: this.getLS[3].id });
        } else {
            template = Error404Template();
        }

        return new Promise((resolve) => resolve(template));
    }

    afterRender() {
        this.isStatusEnable() && this.setActions();
    }

    isStatusEnable() {
        return this.getLS.length === 5 ? true : false;
    }

    setActions() {
        const listTicket = document.getElementsByClassName('check_about')[0],
            butNext = document.getElementsByClassName('check_about-header-but')[0];

        this.getCheck(listTicket, this.getLS[3], this.set);

        butNext.addEventListener('click', () => {
            let j = confirm('Вы точно хотите отправить ?');

            if (j) {
                this.getLS[4] = {
                    status: 'edit',
                };
                this.getLS[5] = {
                    status: 'rezult',
                };
                this.model.addMail(this.getLS);
                this.model.addTask(this.getLS, this.request.id).then(() => this.redirectToTaskInfo());
            }
        });
    }

    redirectToTaskInfo() {
        location.hash = `/list/${this.request.id}/edit/check/rezult`;
    }

    getCheck(listTicket, ticketsInfo) {
        this.getLsMovie = this.getLS[0];
        for (let i = 0; i < this.getLsMovie.length; i++) {
            const set = this.getLsMovie[this.counter].split('_');
            this.counter++;

            listTicket.innerHTML += СheckTicketsTemplate({ ticketsInfo, setR: set[0], setM: set[1] });
        }
    }
}

export default Check;
