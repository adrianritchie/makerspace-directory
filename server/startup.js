Meteor.startup(function () {
  // code to run on server at startup

  //Bootstrap data
  Makers.remove({});
  if (Makers.find().count() === 0) {
    allmakers.forEach(function(maker) {
      Makers.insert(maker);
    });
  }

});
