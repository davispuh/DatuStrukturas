import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement : function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent : function(){
        this.set('attels', new fabric.Canvas('attels'));
        this.get('controller').send('izveidot');
    },
    attels: null,
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
                this.masivs.push(Math.round(Math.random() * 100));
            }
            this.attels.clear();
            var elements = new fabric.Rect({
                left: 50,
                top: 300,
                width: 70,
                height: 70,
                fill: 'white',
                strokeWidth: 4,
                stroke: 'blue',
                selectable: false
            });
            var teksts = new fabric.Text('', {
                top: 300 + (elements.height / 4),
                fill: 'black',
                selectable: false
            });
            for (var i=0; i < this.elementi; i++) {
                elements.left = 50 + (elements.width + 20) * i;
                teksts.setText(this.masivs[i].toString());
                teksts.left = elements.left + (elements.width / 4);
                this.attels.add(elements);
                this.attels.add(teksts);
                elements = fabric.util.object.clone(elements);
                teksts = fabric.util.object.clone(teksts);
            }
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
