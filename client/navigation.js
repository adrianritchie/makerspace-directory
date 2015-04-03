Template.navigation.helpers({
  activeIfTemplateIs: function (template) {
    var currentRoute = Router.current();
    if (!currentRoute) { return ''; }
    var routeTemplate = currentRoute.lookupTemplate().toLowerCase();
    if (routeTemplate.indexOf(':') >= 0)
      routeTemplate = routeTemplate.substr(0, routeTemplate.indexOf(':'));
    return template === routeTemplate ? 'active' : '';
  }
});

Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-edit-profile': function(event) {
      Router.go('profile');
  }
});
