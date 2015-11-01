import Ember from 'ember';
import Strukturas from "datu-strukturas/models/strukturas";

export default Ember.Route.extend({
    model(params) {
      this.controllerFor('application').set('params', params);
      return Strukturas.filterBy('id', params.struktura)[0];
    }
});
