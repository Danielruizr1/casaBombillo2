angular.module('casabombillo')
.factory('dataBase',  function dataBaseFactory () {
    
    return idb.open('casaBombillo', 1, function(upgradeDb){
      var productos = upgradeDb.createObjectStore("productos", { keyPath: "id"});
      var categorias = upgradeDb.createObjectStore("categorias", { keyPath: "id"});
      var pedidos = upgradeDb.createObjectStore("pedidos", { keyPath: "id"});

    });
    //idb.delete('casaBombillo').then(() => console.log('done!'));
  })
    .service('authService', ['$rootScope', 'lock', 'authManager', 
      function authService($rootScope, lock, authManager) { 

  

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        console.log("auth");
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }]);

    
