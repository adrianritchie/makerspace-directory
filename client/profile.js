Template.profile.helpers({
  myProfile : function(){
    return Makers.find({user : Meteor.userId()});
  }
});


Template.profile.events({
  'submit #skillsForm' : function() {
    var skill = event.target.text.value;

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }

})
