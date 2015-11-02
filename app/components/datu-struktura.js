import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement : function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent : function(){
        this.get('controller').send('izveidot');
    },
    elementi: 6,
    masivs: [],
    pozicijas: ['Sākumā', 'Beigās'],
    pievienotPozicija: 'Sākumā',
    algoritmi: ['Izvēles šķirošana', 'Iestarpinājuma šķirošanas', 'Burbuļa metode'],
    kartosana: 'Izvēles šķirošana',
    veidi: ['Indekss', 'Vērtība'],
    dzestVeids: 'Indekss',
    meklesanasVeids: ['Vērtība', 'Minimālā', 'Maksimālā'],
    meklesana: 'Vērtība',
    actions: {
        izveidot() {
            this.masivs = [];
            for (var i=0; i < this.elementi; i++) {
                this.masivs.push(Math.round(Math.random() * this.elementi * 10));
            }
            var attels = this.$(this.element).find('#attels');
        },
        pievienot() {
        },
        kartot() {
        },
        dzest() {
        },
        meklet() {
        }
    }
});
