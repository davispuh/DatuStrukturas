import Ember from 'ember';
import Strukturas from "datu-strukturas/models/strukturas";

export default Ember.Route.extend({
    model() {
        return Strukturas;
    }
});
