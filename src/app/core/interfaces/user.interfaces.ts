export interface CurrentUser {
    username: string;
    firstname: string;
    lastname: string;
    dateRegistered: string;
  }
  
  export interface FirebaseUser {
    displayName: CurrentUser;
  }