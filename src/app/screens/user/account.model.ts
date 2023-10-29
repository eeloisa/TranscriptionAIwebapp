import { UserParameter } from "./user-parameter.model";

export class Account {
  accountId: string;
  accountLogin: string;
  accountName: string;
  profileId: string;
  profile: string;
  profileName: string;
  roles: Role[];
  params: UserParameter[];
  userCotaAvailable: number
}

export class Profile {
  id: string;
  name: string;
  code: string;
  roles?: Role[];
}

export class Role {
  id: string;
  name: string;
  code: string;
}
