import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement : function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent : function(){
        this.set('attels', new window.fabric.Canvas('attels'));
        this.get('controller').send('izveidot');
    },
    attels: null,
    elements: new window.fabric.Rect({
                left: 50,
                top: 300,
                width: 70,
                height: 70,
                fill: 'white',
                strokeWidth: 4,
                stroke: 'blue',
                selectable: false}),
    teksts: new window.fabric.Text('', {
                left: 60,
                top: 300 + 70 / 4,
                fill: 'black',
                textAlign: 'center',
                selectable: false}),
    linija: new window.fabric.Line([], {
                strokeWidth: 3,
                stroke: 'black',
                selectable: false}),
    platums: 1000,
    garums: 800,
    elementi: 6,
    struktura: null,
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
            if (this.elementi < 1) {
                this.set('elementi', 1);
            }
            if (this.elementi > 10) {
                this.set('elementi', 10);
            }
            this.struktura = this.get('struktura').izveidot(this.elementi);
            this.attels.clear();
            this.struktura.zimet(this.attels, this.elements, this.teksts, this.linija);
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
