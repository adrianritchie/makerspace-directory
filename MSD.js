Router.configure({
  layoutTemplate: 'layout'
});
Router.map(function() {
    this.route('home', { path : '/'});
    this.route('profile');
    this.route('about');
});

Makers = new Mongo.Collection("makers");
