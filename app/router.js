import Ember from 'ember';
import config from './config/environment';
import Strukturas from "datu-strukturas/models/strukturas";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('struktura', { path: '/:struktura' });
});

export default Router;
