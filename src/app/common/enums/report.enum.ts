export enum ReportEnum {
  contracted_quota = 1,
  transcription_by_user = 2,
  last_login = 3,
}

export function reportLabel(value: ReportEnum): string {
  switch (value) {
    case 1:
      return 'Cota Contratada';
    case 2:
      return 'Transcrições por Usuário';
    case 3:
      return 'Ultimos Logins';
    default:
      return '';
  }
}
