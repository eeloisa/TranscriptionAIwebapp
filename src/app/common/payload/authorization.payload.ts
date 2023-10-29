import { AuthorizationTypeEnum } from "../enums/authorization-type.enum";

export class AuthorizationPayload {
  applicationId: string;
  type: AuthorizationTypeEnum;
  login: string;
  password?: string;
  accessToken?: string;
}
