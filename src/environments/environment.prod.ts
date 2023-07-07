export const environment = {
  production: true,
  api:{
    baseUrl:'https://192.168.1.131:443',
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
