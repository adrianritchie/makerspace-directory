Session.setDefault("skillFilter", []);
Session.setDefault("needFilter", []);

Template.home.helpers({
  makers : function() {
    var filter = { };

    Session.get('skillFilter').forEach(function(f) {
      if (!filter.$and) { filter.$and = []; }
      filter.$and.push({cando : f});
    });
    Session.get('needFilter').forEach(function(f) {
      if (!filter.$and) { filter.$and = []; }
      filter.$and.push({lookingfor : f});
    });

    return Makers.find(filter);
  },
  skillFilter: function () {
    return Session.get("skillFilter");
  },
  needFilter: function () {
    return Session.get("needFilter");
  }
});

Template.home.events({
  'click .skill' : function(event) {
    sessionFilterAdd("skillFilter", $(event.target).text());
  },
  'click .need' : function(event) {
    sessionFilterAdd("needFilter", $(event.target).text());
  }
});

Template.search.helpers({
  skills : function(){
    var results = Makers.find({}, {cando:1, _id:0}).fetch().map(function(it){
      return it.cando;
    });

    results = _.flatten(results);
    return _.uniq(results);
  },
  needs : function(){
    var results = Makers.find({}, {lookingfor:1, _id:0}).fetch().map(function(it){
      return it.lookingfor;
    });

    results = _.flatten(results);
    return _.uniq(results);
  }
});

Template.search.events({
  "submit .skillsForm": function (event) {
    var text = event.target.skill.value;
    sessionFilterAdd("skillFilter", text);
    event.target.skill.value = "";

    // Prevent default form submit
    return false;
  },
  "submit .needsForm": function (event) {
    var text = event.target.need.value;
    sessionFilterAdd("needFilter", text);
    event.target.need.value = "";

    // Prevent default form submit
    return false;
  }
});
Template.search.onRendered(function() {
  Meteor.typeahead.inject();
});


//Template.home.needs = function(){
//	return Makers.find({}, ).fetch().map(function(it){ return it.name; });
//};

Template.filter.events({
  'click .skillFilter' : function(event) {
    sessionFilterRemove("skillFilter", $(event.target).closest('.filter').data("value"));
  },
  'click .needFilter' : function(event) {
    sessionFilterRemove("needFilter", $(event.target).closest('.filter').data("value"));
  },
  'mouseenter .filter' : function(event) {
    $(event.target).children('.glyphicon').toggleClass('glyphicon-remove')
                                          .toggleClass('glyphicon-filter');
  },
  'mouseleave .filter' : function(event) {
    $(event.target).children('.glyphicon').toggleClass('glyphicon-filter')
                                          .toggleClass('glyphicon-remove');
  }
});


function sessionFilterAdd(sessionVariable, value) {
  var sessionData = Session.get(sessionVariable);
  if (sessionData.indexOf(value) < 0) {
    sessionData.push(value);
    Session.set(sessionVariable, sessionData);
  }
}

function sessionFilterRemove(sessionVariable, value) {
  var sessionData = Session.get(sessionVariable);
  if (sessionData.indexOf(value) >= 0) {
    sessionData.splice(sessionData.indexOf(value), 1)
    Session.set(sessionVariable, sessionData);
  }
}

function uniq(a) {
    return a.sort().filter(function(item, pos) {
        return !pos || item != a[pos - 1];
    })
}
