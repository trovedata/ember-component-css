import Ember from 'ember';

export function classFor(input) {
  var key = this._debugContainerKey.replace('component:', '') + '.' + input;
  return Ember.COMPONENT_CSS_LOOKUP[key];
}

export default Ember.HTMLBars.makeBoundHelper(classFor);
