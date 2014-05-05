'use strict';
define(['app'], function(App) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Register = Backbone.Model.extend({
            urlRoot: 'register',
            name: 'Register',

            defaults: {
                name: '',
                slug: ''
            },

            validate: function(attrs) { // , options
                var errors = {};
                if (!attrs.fileName) {
                    errors.fileName = 'can\'t be blank';
                }
                //     if (! attrs.somethingelse) {
                //       errors.lastName = 'can't be blank';
                //     }
                //     else{
                //       if (attrs.somethingelse.length < 2) {
                //         errors.somethingelse = 'is too short';
                //       }
                //     }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.RegisterCollection = Backbone.Collection.extend({
            url: '/',
            model: Entities.Register,
//            reset: function() {
//                console.log('reset; Entities.Register count: ' + Entities.Register.length);
////                $(this.el).html("");
////                FORMY.Incidents.each(this.addOne);
//            }
        });

        var initializeRegisters = function() {
//            console.log('contextName' + contextName);
//            App.log('Initializing Fake Registers', contextName, 1);

            var fakeRegisters = new Entities.RegisterCollection([{
                name: 'First Register',
                slug: 'page-1'
            }, {
                name: 'Second Register',
                slug: 'page-2'
            }]);

            return fakeRegisters;
        };

        var API = {
            getRegisterEntities: function() {
//                App.log('register:entities event detected', 'Entities', 1);
                App.log('register:entities event detected', contextName, 1);
                var registerCollection = new Entities.RegisterCollection();
                registerCollection.reset(initializeRegisters().models); // update the collection
                return registerCollection;
            },
            getRegisterEntitiesPromises: function() {
//                App.log('register:entities event detected', contextName, 1);
                console.log('getRegisterEntities requested' + contextName);
                var registerCollection = new Entities.RegisterCollection();
                var defer = new $.Deferred();
//                registerCollection.fetch({
//                    complete: function() {
//                        defer.resolve(registerCollection); // send back the collection
//                    },
//                    success: function(data){
////                         App.log('success data', contextName, 1);
//                            console.log('getRegisterEntities success: ' + data);
//                            defer.resolve(registerCollection);
//                        }
//                });
//                // chain the above promise,
//                var promise = defer.promise();
//                $.when(promise).done(function(registerCollection) {
//                    console.log('getRegisterEntities detected');
//                    // check to see if it had content:
//                    if (registerCollection.length === 0) { // if not, get defaults.
//                        // FAKE NETWORK LAG
//                        setTimeout(function() {
//                            // App.trigger('page:register', models); // add each register to the menu
//                            // if we don't have any imageCollection yet, create some for convenience
//                            registerCollection.reset(initializeRegisters().models); // update the collection
//                        }, 2000);
//
//                    }
//                });
//                return promise;
                setTimeout(function(){
                    registerCollection.fetch({
                        success: function(data){
                            console.log('getRegisterEntities success: ' + data);
                            registerCollection.reset(initializeRegisters().models); // update the collection
                            defer.resolve(registerCollection);
                        }
                    });
                }, 2000);
                console.log('defer.promise(): ' + defer.toSource() );
                return defer.promise();
            }
        };



        App.reqres.setHandler('register:entities', function() {
            return API.getRegisterEntities();
        });

        // App.reqres.setHandler('register:entity', function(id) {
        // return API.getRegisterEntity(id);
        // });

        App.reqres.setHandler('register:entity:new', function(id) {
//            App.log('Making new object: ' + id, this.name, 1);
            var model = new Entities.Register(id);
            App.log('Made new object: ' + id, model.name, 1);
            return model;
        });
    });

    return;
});