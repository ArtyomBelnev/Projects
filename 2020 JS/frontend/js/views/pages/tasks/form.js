import Tasks from '../../../models/tasks';

class Form {
    constructor(movie, table, tdList, countTickets, mail, name, сheckbox, botTextTable, secContainer, minContainer) {
        this.countTickets = countTickets;
        this.botTextTable = botTextTable;
        this.secContainer = secContainer;
        this.minContainer = minContainer;
        this.сheckbox = сheckbox;
        this.tdList = tdList;
        this.movie = movie;
        this.table = table;
        this.mail = mail;
        this.name = name;
        this.getLSclose;
        this.getLS;
        this.timer;
        this.metksTikets = [];
        this.allPrmtr = [];
        this.info = {};
        this.places = '';
        this.counter = 0;
        this.ms = 100;
        this.sec = 59;
        this.min = 4;
        this.model = new Tasks();
    }

    changeTable(e) {
        let target = e.target.dataset.td;

        if (target) {
            let i = e.target.classList.toggle('td-active');

            if (i === true) {
                this.counter++;
            } else if (i === false) {
                this.counter--;
            }
            this.getSeats();
        }
    }

    cancelForm() {
        let j = confirm('Вы точно хотите отменить заказ?');

        if (j) {
            this.defaultForm();
        }
    }

    changeWindows() {
        const i = window.location.href.split('#')[1];

        if (i === '/list' || i === '/' || i === '' || i === `/list/${this.movie.id}`) {
            this.defaultForm();
        }

        if (i === `/list/${this.movie.id}/edit/check` || i === `/list/${this.movie.id}/edit/check/rezult`) {
            clearTimeout(this.timer);
        }
    }

    defaultForm() {
        this.tdList.forEach((e2) => {
            if (e2.classList.contains('td-active')) {
                e2.classList.remove('td-active');
            }
        });

        this.сheckbox.classList.remove('errorValid');
        this.name.classList.remove('errorValid');
        this.mail.classList.remove('errorValid');
        this.botTextTable.classList.add('table_text');
        this.botTextTable.classList.remove('table_text-active');
        this.name.value = '';
        this.mail.value = '';
        this.сheckbox.checked = false;
        this.counter = 0;
        this.getSeats();
        this.allPrmtr = [];
        this.minContainer.innerText = this.min;
        this.secContainer.innerText = this.sec;
        this.model.addTask([], this.movie.id);
        clearTimeout(this.timer);
    }

    getSeats() {
        if (this.counter >= 1) {
            this.botTextTable.innerText = `Выброно мест ${this.counter}`;
            this.botTextTable.classList.remove('table_text-active');
            this.botTextTable.classList.remove('table_text');
            this.botTextTable.classList.add('table_text2');
        } else {
            this.botTextTable.innerText = `Выберите место`;
            this.botTextTable.classList.remove('table_text2');
            this.botTextTable.classList.add('table_text');
        }
    }

    getCheckbox(e) {
        let target = e.target.validInputs;

        if (target === undefined) {
            this.сheckbox.classList.remove('errorValid');
        }

        if (this.сheckbox.checked) {
            this.сheckbox.classList.add('checkbox_active');
        }

        if (this.сheckbox.checked === false) {
            this.сheckbox.classList.remove('checkbox_active');
        }
    }

    getLsValue() {
        this.allPrmtr[0] = this.metksTikets;
        this.allPrmtr[1] = this.info;
        this.allPrmtr[2] = {
            min: this.min,
            sec: this.sec,
        };
        this.allPrmtr[3] = {
            title: this.movie.title,
            date: this.movie.date,
            price: this.movie.price,
            times: this.movie.times,
            id: this.movie.id,
        };
    }

    filterTicket() {
        this.tdList.forEach((el) => {
            if (el.classList.contains('td-active')) {
                this.metksTikets.push(el.dataset.td);
            }
        });
    }

    recoveryForm(e) {
        this.getLSclose = e[`${this.movie.id}`];

        this.model.getTasksMovie(this.movie.id).then((task) => this.recoveryFormNext(task));
    }

    recoveryFormNext(task) {
        this.getLS = task[0];

        if (this.getLSclose !== undefined && this.getLSclose !== 0) {
            this.getLSclose.forEach((e1) => {
                this.tdList.forEach((e2) => {
                    if (e1 === e2.dataset.td) {
                        e2.classList.add('td-close');
                        e2.removeAttribute('data-td');
                    }
                });
            });
        }

        if (this.getLS !== undefined && this.getLS.length !== 0) {
            if (this.getLS[0].length > 0) {
                this.getLS[0].forEach((e1) => {
                    this.tdList.forEach((e2) => {
                        if (e1 === e2.dataset.td) {
                            e2.classList.add('td-active');
                        }
                    });
                });

                this.counter = this.getLS[0].length;
                this.getSeats();

                if (this.getLS.length === 5) {
                    this.getLS = this.getLS.filter((item) => item !== this.getLS[4]);
                    this.model.addTask(this.getLS, this.movie.id);
                }
            }

            if (this.getLS[1]) {
                if (this.getLS[1].hasOwnProperty('mail')) {
                    this.mail.value = this.getLS[1]['mail'];
                }
                if (this.getLS[1].hasOwnProperty('name')) {
                    this.name.value = this.getLS[1]['name'];
                }
                if (this.getLS[1].hasOwnProperty('checkbox')) {
                    this.сheckbox.checked = this.getLS[1]['checkbox'];
                    this.сheckbox.classList.add('checkbox_active');
                }
            }

            if (this.getLS[2]) {
                if (this.getLS[2].hasOwnProperty('min')) {
                    this.min = this.getLS[2]['min'];
                }
                if (this.getLS[2].hasOwnProperty('sec')) {
                    this.sec = this.getLS[2]['sec'];
                }

                this.minContainer.innerText = this.min;
                this.secContainer.innerText = this.sec;
            }
        }
    }

    resetWindows() {
        if (window.location.href.split('#')[1] === `/list/${this.movie.id}/edit`) {
            this.metksTikets = [];
            this.filterTicket();
            this.validInputs();
            this.saveLs();
        }
    }

    saveLs() {
        this.getLsValue();
        this.model.addTask(this.allPrmtr, this.movie.id);
    }

    startTimer() {
        this.minContainer.innerText = this.min;
        this.secContainer.innerText = this.sec;

        this.timer = setInterval(() => {
            this.ms--;

            if (this.ms === 0) {
                this.ms = 100;

                this.sec--;

                if (this.sec === -1) {
                    this.sec = 59;

                    this.min--;
                    this.minContainer.innerText = this.min;
                }
                if (this.min === -1) {
                    this.minContainer.innerText = 0;
                    this.secContainer.innerText = 0;

                    clearTimeout(this.timer);
                    this.exitForm();
                    return;
                }

                this.secContainer.innerText = this.sec;
            }
        }, 10);
        return this;
    }

    nextForm() {
        event.preventDefault();
        this.metksTikets = [];
        this.validInputs();
        this.filterTicket();

        if (!this.info.hasOwnProperty('mail')) {
            this.mail.value = '';
            this.mail.classList.add('errorValid');
        }
        if (!this.info.hasOwnProperty('name')) {
            this.name.value = '';
            this.name.classList.add('errorValid');
        }
        if (!this.info.hasOwnProperty('checkbox')) {
            this.сheckbox.checked = false;
            this.сheckbox.classList.add('errorValid');
        }

        if (this.counter == 0) {
            this.botTextTable.classList.remove('table_text');
            this.botTextTable.classList.add('table_text-active');
        }

        if (this.metksTikets.length > 0 && this.info['name'] && this.info['mail'] && this.info['checkbox']) {
            this.min = 4;
            this.sec = 59;
            this.allPrmtr[4] = {
                status: 'edit',
            };
            this.getLsValue();
            this.model.addTask(this.allPrmtr, this.movie.id).then(() => this.redirectToCheck());
            clearTimeout(this.timer);
        }
    }

    redirectToCheck() {
        location.hash = `/list/${this.movie.id}/edit/check`;
    }

    validInputs() {
        const regMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const regName = /^(([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23}) ([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23}))$/;

        if (regMail.test(this.mail.value)) {
            this.info['mail'] = this.mail.value;
        }

        if (regName.test(this.name.value)) {
            this.info['name'] = this.name.value;
        }

        if (this.сheckbox.checked) {
            this.info['checkbox'] = this.сheckbox.checked;
            if (this.сheckbox.classList.contains('errorValid')) {
                this.сheckbox.classList.remove('errorValid');
            }
        }
    }

    exitForm() {
        alert('Время вышло!');
        this.defaultForm();

        location.hash = '/list';
    }
}

export default Form;
