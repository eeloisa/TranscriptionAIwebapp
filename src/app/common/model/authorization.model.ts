export class Authorization {
  token: string;
  redirectDomain: string;
  applications: Application[];
}

export class Application {
  Id: string;
  Name: string;
  Code: string;
  RedirectDomain: string;
  Profiles: Profile[];
}

export class Profile {
  Id: string;
  Name: string;
  Code: string;
  Roles?: Profile[];
}
