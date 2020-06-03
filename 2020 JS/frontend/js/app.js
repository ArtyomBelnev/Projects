import '../styles/app';

import { parseRequestURL } from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

import List from './views/pages/tasks/list';
import Info from './views/pages/tasks/info';
import Edit from './views/pages/tasks/edit';
import Check from './views/pages/tasks/check';
import Rezult from './views/pages/tasks/rezult';

const Routes = {
    '/': About,
    '/list': List,
    '/list/:id': Info,
    '/list/:id/edit': Edit,
    '/list/:id/edit/check': Check,
    '/list/:id/edit/check/rezult': Rezult,
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

    header.render().then((html) => (headerContainer.innerHTML = html));

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}${request.check ? `/${request.check}` : ''}${
            request.rez ? `/${request.rez}` : ''
        }`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then((data) => {
        page.render(data).then((html) => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    footer.render().then((html) => (footerContainer.innerHTML = html));
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
