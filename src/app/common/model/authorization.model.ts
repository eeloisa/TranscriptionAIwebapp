export class Authorization {
  token: string;
  redirectDomain: string;
  applications: Application[];
}

export class Application {
  id: string;
  name: string;
  code: string;
  redirectDomain: string;
  Profiles: Profile[];
}

export class Profile {
  Id: string;
  Name: string;
  Code: string;
  Roles?: Profile[];
}
