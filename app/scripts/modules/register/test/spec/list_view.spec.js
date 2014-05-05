/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'jquery',
        'list/view',
        'entities/register'
    ],

    function(App, $) {

        var contextName = 'Test List.View';

        before(function () {
            // Create test fixture.
            this.$fixture = $('<div id=\'note-view-fixture\'></div>');
        });

        beforeEach(function () {
            // Empty out and rebind the fixture for each run.
            this.$fixture.empty().appendTo($('#fixtures'));

            // New default model and view for each test.
            //
            // Creation actually calls `render()`, so in tests we have an
            // *already rendered* view.
//            var model =   App.request('register:entity:new', 0);
//
//            this.view = new TestView({
//                el: this.$fixture,
//                model: model
//            });

            var entities = App.request('register:entities');
            if (entities !== null) {
                App.log('Creating view: ', contextName, 1);
                this.view = new App.RegisterApp.List.View.Register({
                    el: this.$fixture,
                    collection: entities
                });
                this.view.render();
                var $registerList = $('#registerList');
                App.log('$registerList.html(): ' + $registerList.html(), contextName, 1);
//                App.log('Render: ' + this.$fixture.html(), contextName, 1);

            }
        });

        afterEach(function () {
            // Destroying the model also destroys the view.
//            App.log('Teardown: ' + this.view.collection.length, contextName, 1);
//            this.view.collection.reset();
//            App.log('Teardown: ' + this.view, contextName, 1);

        });

        after(function () {
            // Remove all sub-fixtures after test suite finishes.

            App.log('Teardown: ' + this.view.collection.length, contextName, 1);
            this.view.collection.reset();
            App.log('Teardown: ' + this.view, contextName, 1);
            $('#fixtures').empty();
        });

//        describe('List view Deferred', function() {
//            var entities = App.request('register:entities');
////        console.log('entities: ' + JSON.stringify(entities));
//            $.when(entities).done(function(items){
//                console.log('items: ' + JSON.stringify(items));
//                if (items !== null) {
//                    var SOMEMODULE = new App.RegisterApp.List.Register({
//                        collection: entities
//                    });
//                }
//
//                it('should exist', function() {
//                    expect(SOMEMODULE).to.exist;
//                });
//
//            });
//
//            // it('should be an instance of XXXXX', function() {
//            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
//            // });
//
//        });

        describe('List view', function() {

            it('can render registerList', function () {
//                var $registerList = $('#registerList');
//                expect($registerList.text()).to.not.equal('');
                App.log('this.$fixture.html(): ' + this.$fixture.html(), contextName, 1);
                expect(this.$fixture.html()).to.contain('register_list');

            });

//            var SOMEMODULE = null;
//            var entities = App.request('register:entities');
//            if (entities !== null) {
//                SOMEMODULE = new App.RegisterApp.List.View.Register({
//                    collection: entities
//                });
//                SOMEMODULE.render();
//            }
//
//            it('should exist', function() {
//                expect(SOMEMODULE).to.exist;
//            });


            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });
    }
);