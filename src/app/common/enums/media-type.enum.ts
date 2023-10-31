export enum MediaTypeEnum {
  Video = 1,
  Audio = 2
}

export function mediaTypeLabel(value: MediaTypeEnum): string {
  switch (value) {
    case 1:
      return 'Vídeo';
    case 2:
      return 'Áudio';
    default:
      return '';
  }
}
