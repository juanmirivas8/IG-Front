// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api:{
    baseUrl:'http://localhost:5092',
    endpoints:{
      candidate:{
        getAllCandidates:'/Candidate/GetAll',
        create:'/Candidate/Create',
        update:'/Candidate/Update',
        delete:'/Candidate/Delete/',
        get:'/Candidate/GetById/'
      },
      application:{
        getAllApplications:'/Application/GetAll',
        create:'/Application/Create',
        update:'/Application/Update',
        delete:'/Application/Delete/',
        get:'/Application/GetById/'
      },
      position:{
        getAllPositions:'/Position/GetAll',
        create:'/Position/Create',
        update:'/Position/Update',
        delete:'/Position/Delete/',
        get:'/Position/GetById/'
      },
      authRegister:'/Auth/Register',
      authLogin: '/Auth/Login',
      lookUp: '/LookUp/GetAllLookUps'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
