export enum TranscriptionStatusEnum {
  AwaitingProcessing = 1,
  Processing = 2,
  Transcribed = 3,
  Error = 4,
}

export function transcriptionStatusLabel(value: TranscriptionStatusEnum): string {
  switch (value) {
    case 1:
      return 'Aguardando';
    case 2:
      return 'Processando';
    case 3:
      return 'Finalizada';
    case 4:
      return 'Erro';
    default:
      return '';
  }
}
