/*global expect */
/*jshint expr: true */
'use strict';

define([
        'app',
        'list/controller'
    ],

    function(App) {

        var SOMEMODULE = App.RegisterApp.List.Controller.listRegister();
//        var entities = App.request('register:entities');
        describe('Controller', function() {

            it('should exist', function() {
                expect(SOMEMODULE).to.exist;
            });

            // it('should be an instance of XXXXX', function() {
            //     // expect(XXXXX).to.be.an.instanceof(XXXXX);
            // });

        });

    }
);