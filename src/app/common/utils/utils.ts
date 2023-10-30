import { Parameter } from 'src/app/screens/parameter/parameter.model';

export function getParamValue(params: Parameter[], code: string): string {
  return params.find((p) => p.code == code).defaultValue;
}
