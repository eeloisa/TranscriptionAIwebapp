import { Parameter } from "../parameter/parameter.model";

export class UserParameter extends Parameter {
  id: number;
  userId: string;
  value: string;
  systemParameterId: number;
}
