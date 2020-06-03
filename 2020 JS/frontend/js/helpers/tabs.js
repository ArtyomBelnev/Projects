class Tabs {
    constructor(tabPanel, tabsHeader, tab) {
        this.tabPanel = tabPanel;
        this.tabsHeader = tabsHeader;
        this.tab = tab;
    }

    selectPanel(e) {
        let target = e.target.dataset.targ;

        if (target) {
            this.tabPanel.forEach((el) => el.classList.remove('active'));
            this.tab.forEach((el) => el.classList.remove('active'));
            e.target.classList.add('active');

            this.selectTabPan(target);
        }
    }

    selectTabPan(target) {
        this.tabPanel.forEach((el) => {
            if (el.classList.contains(target)) {
                el.classList.add('active');
            }
        });
    }
}

export default Tabs;
