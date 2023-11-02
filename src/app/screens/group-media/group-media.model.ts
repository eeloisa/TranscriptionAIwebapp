import { MediaTypeEnum } from 'src/app/common/enums/media-type.enum';
import { TranscriptionStatusEnum } from 'src/app/common/enums/transcription-status.enum';

export class GroupMedia {
  id: number;
  transcriptionId: number;
  title: string;
  transcriptionStatus: TranscriptionStatusEnum;
  user: string;
  medias?: Media[];
  transcription?: Transcription;
  registrationDate?: string;
}

export class Media {
  id: number;
  title: string;
  transcriptionStatus: TranscriptionStatusEnum;
  order: number;
  url: string;
  mediaType: MediaTypeEnum;
  size: number;
  contentType: string;
  file?: File;
  hashCode?: string;
  registrationDate?: string;
}

export class Transcription {
  id: number;
  summary: string;
  subject: string;
  categories: string;
  brazilianEntities: string;
  speakers: Speaker[];
  dialogues: Dialogue[];
}

export class Dialogue {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
  order: number;
  speaker: string;
  mediaId: number;
}

export class Speaker {
  name: string;
  totalInSeconds: number;
  mediaId: number;
}
