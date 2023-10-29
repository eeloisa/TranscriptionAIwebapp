import { Application } from "./authorization.model";

export class BrainzAuthToken {
    applications: Application;
    aud: string;
    exp: number;
    iat: number;
    institutionId: string;
    iss: string;
    jti: string;
    login: string;
    name: string;
    sub: string;
  }
