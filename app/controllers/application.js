import Ember from 'ember';
import Strukturas from "datu-strukturas/models/strukturas";

export default Ember.Controller.extend({
    irSakums: Ember.computed('currentRouteName', function() {
        return (this.get('currentRouteName') === 'index');
    }),
    struktura: Ember.computed('currentRouteName', function() {
        return Strukturas.filterBy('id', this.get('currentRouteName'))[0];
    })
});
