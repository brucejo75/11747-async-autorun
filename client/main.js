import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  const self = this;
  self.counter = new ReactiveVar(0);

  // This autorun is not reactive
  self.autorun(async function() {
    let asyncData = await  asyncDataFunction();
    let count = self.counter.get();
    console.log(`Not Reactive: data ${asyncData}, count: ${count}`);
  });

  // This autorun is reactive
  self.autorun(async function() {
    let count = self.counter.get();
    let asyncData = await  asyncDataFunction();
    console.log(`Reactive: data ${asyncData}, count: ${count}`);
  });
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

function asyncDataFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });
}