import {
  GroupMedia,
  Speaker,
} from './../../screens/group-media/group-media.model';
import { MediaFormatEnum } from '../enums/media-format.enum';
import { MediaTypeEnum } from '../enums/media-type.enum';

export class GroupMediaPayload {
  id: number;
  title: string;
  medias: MediaPayload[];
}

export class MediaPayload {
  id: number;
  hashCode?: string;
  title: string;
  fileName: string;
  fileNameBucket: String;
  subFolderBucket: string;
  bucketName: string;
  size: number;
  mediaType: MediaTypeEnum;
  mediaFormat: MediaFormatEnum;
  contentType: string;
  order: number;
}

export class SpeakerPayload {
  groupMediaId: number;
  mediaId: number;
  speaker: string;
  speakerNew: string;
}

export class DownloadPayload {
  textQuestionIteration: string;
  textIteration: string;
}
