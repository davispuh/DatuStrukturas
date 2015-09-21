import Ember from 'ember';
import config from './config/environment';
import Strukturas from "datu-strukturas/models/strukturas";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    for (var i = 0; i < Strukturas.length; i++) {
        this.route(Strukturas[i].id);
    }
});

export default Router;
