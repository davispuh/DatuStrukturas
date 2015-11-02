import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datu-struktura', 'Integration | Component | datu struktura', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datu-struktura}}`);

  assert.notEqual(this.$().text().trim().length, 0);

  // Template block usage:
  this.render(hbs`
    {{#datu-struktura}}
      teksts
    {{/datu-struktura}}
  `);

  assert.notEqual(this.$().text().trim().indexOf('teksts'), -1);
});
