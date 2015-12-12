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
                width: 70,
                height: 70,
                fill: 'white',
                strokeWidth: 4,
                stroke: '#008CBA',
                selectable: false}),
    teksts: new window.fabric.Text('', {
                fill: 'black',
                textAlign: 'center',
                selectable: false}),
    linija: new window.fabric.Line([], {
                strokeWidth: 3,
                stroke: 'black',
                selectable: false}),
    animacija: Date.now(),
    platums: 1400,
    augstums: 1200,
    elementi: 0,
    pievienotVertiba: Math.round(Math.random() * 99),
    pievienotIzslegts: false,
    struktura: null,
    pozicijas: ['Beigās', 'Sākumā', 'Pēc Aktīvā', 'Pirms Aktīvā'],
    pievienotPozicija: 'Beigās',
    algoritmi: ['Izvēles šķirošana', 'Iestarpinājuma šķirošanas', 'Burbuļa metode'],
    kartosana: 'Izvēles šķirošana',
    veidi: ['Atslēga'],
    dzestVeids: 'Atslēga',
    dzestAtslega: 'A',
    dzestIzslegts: true,
    meklesanasVeids: ['Vērtība', 'Minimālā', 'Maksimālā'],
    meklesana: 'Vērtība',
    mekletVertiba: '',
    mekletIzslegts: true,
    actions: {
        izveidot() {
            if (isNaN(this.elementi) || this.elementi < 0) {
                this.set('elementi', 0);
            }
            if (this.elementi > 10) {
                this.set('elementi', 10);
            }
            this.set('pievienotIzslegts', false);
            this.struktura = this.get('struktura').izveidot(this.elementi);
            if (this.struktura.elementuSkaits && this.struktura.elementuSkaits() > 0) {
                this.set('dzestIzslegts', false);
                this.set('mekletIzslegts', false);
            } else {
                this.set('dzestIzslegts', true);
                this.set('mekletIzslegts', true);
            }
            this.attels.clear();
            this.struktura.zimet(this.attels, this.elements, this.teksts, this.linija);
        },
        pievienot() {
            if (this.pievienotIzslegts || (this.struktura.elementuSkaits && this.struktura.elementuSkaits() >= 14)) {
                this.set('pievienotIzslegts', true);
                return;
            }
            var objekts = this;
            if (Math.floor(new Date() - this.animacija) > 0) {
                var gaidit = this.struktura.pievienot(parseInt(this.pievienotVertiba, 10), this.pozicijas.indexOf(this.pievienotPozicija), this.attels);
                this.set('animacija', Date.now() + gaidit);
                this.set('dzestIzslegts', false);
                this.set('mekletIzslegts', false);
                this.set('pievienotVertiba', Math.round(Math.random() * 99));
                if (this.struktura.elementuSkaits && this.struktura.elementuSkaits() >= 14) {
                    this.set('pievienotIzslegts', true);
                }
                setTimeout(function(){
                    objekts.attels.clear();
                    objekts.struktura.zimet(objekts.attels, objekts.elements, objekts.teksts, objekts.linija);
                }, gaidit);
            }
        },
        kartot() {
        },
        dzest() {
            if (this.dzestIzslegts || this.dzestAtslega.length <= 0 || (this.struktura.elementuSkaits && this.struktura.elementuSkaits() <= 0)) {
                this.set('dzestIzslegts', true);
                return;
            }
            var objekts = this;
            var gaidit = this.struktura.dzest(this.dzestAtslega.charAt(0).toUpperCase(), this.attels);
            if (this.struktura.elementuSkaits && this.struktura.elementuSkaits() < 14) {
                this.set('pievienotIzslegts', false);
            }
            if (this.struktura.elementuSkaits && this.struktura.elementuSkaits() <= 0) {
                this.set('dzestIzslegts', true);
                this.set('mekletIzslegts', true);
            }
            objekts.attels.clear();
            objekts.struktura.zimet(objekts.attels, objekts.elements, objekts.teksts, objekts.linija);
        },
        meklet() {
            if (this.mekletIzslegts || (this.struktura.elementuSkaits && this.struktura.elementuSkaits() <= 0)) {
                this.set('mekletIzslegts', true);
                return;
            }
            if (this.meklesana == 'Vērtība') {
                var v = parseInt(this.mekletVertiba, 10);
                this.set('mekletVertiba', isNaN(v) ? 0 : v.toString());
            } else {
                this.set('mekletVertiba', '');
            };
            var objekts = this;
            if (Math.floor(new Date() - this.animacija) > 0) {
                var gaidit = this.struktura.meklet(this.meklesanasVeids.indexOf(this.meklesana), parseInt(this.mekletVertiba, 10), this.attels);
                this.set('animacija', Date.now() + gaidit);
                setTimeout(function(){
                    objekts.attels.clear();
                    objekts.struktura.zimet(objekts.attels, objekts.elements, objekts.teksts, objekts.linija);
                }, gaidit);
            }
        }
    }
});
