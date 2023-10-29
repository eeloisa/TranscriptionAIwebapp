import { TranscriptionStatusEnum } from 'src/app/common/enums/transcription-status.enum';
import { GroupMedia, Media } from './group-media.model';
import { MediaTypeEnum } from 'src/app/common/enums/media-type.enum';
import { transcriptionsMock } from '../transcription/transcription.mock';

export let mediasMock: Media[] = [
  {
    id: 1,
    order: 1,
    title: 'Video de Alguma Coisa',
    mediaType: MediaTypeEnum.Video,
    transcriptionStatus: TranscriptionStatusEnum.Transcribed,
    url: 'https://storage.googleapis.com/reeducation-transcription-bucket/videos/8565b598-aa8b-494c-841a-03710b928ae1.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=poc-conta%40poc-brito.iam.gserviceaccount.com%2F20231021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231021T141317Z&X-Goog-Expires=432000&X-Goog-SignedHeaders=host&X-Goog-Signature=69e9a9f7498b126e0d920178e9313de379890c4802a5c1bd1852988357ff1d9fc9150008ca0c5990f237992290f3efe9dc9b4fb269343a0fda249f521e307ea6692f649fdc93531b4c5253bd73e81532427692b92205c196a1b31f4e00d93b1214a5750703d2f8a95a5315168597bd3c6a0f9f1d30bd007983ccbfa2370b2728392763b61a18d6231605c81ed9db52b83dadaa398039413df72990b71cb068d8466f8a7681b1c18694d655161c49a93e61567ca5c2f3a4e9e1f8717a7bf54a5c45af6917d57e9b5db14d11c43c5f96ba5ed1dfd7fe4d2abbf369e2a3e39b5d06cc51d9c9742888dc1c0e62f36e74ca426e60df4e560f85abb5c9eee45f76c253',
  },
  {
    id: 2,
    order: 2,
    title: 'Audio Qualquer',
    mediaType: MediaTypeEnum.Audio,
    transcriptionStatus: TranscriptionStatusEnum.Transcribed,
    url: 'https://storage.googleapis.com/reeducation-transcription-bucket/audios/291633b3-0fde-46e5-b566-21d71c028e82.mp3?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=poc-conta%40poc-brito.iam.gserviceaccount.com%2F20231021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231021T141317Z&X-Goog-Expires=432000&X-Goog-SignedHeaders=host&X-Goog-Signature=a7a51caa4bd019a040446695c8ebeb326cd8de4696cefa292089c6e29be3b3dffd0e8fa4f9de7f0e148cc749c32c859bf01cb6ff6cd44777f8b86b19ed86210802436cdb095024ec0709da0541d6bf99d48448e965a50fae4dd15746d27783f1aba8e178d88fee631369ba50c03a42581eaf3a9714fa3d0ace7c8dc160f5cf158cbdce558a8a59e7c9f0f1f7bd45f72264ebffa6ed2635a90a8dcc8d11991ffc20208ec96c279249d67314c9ef1e380ab3eb58f39073c8a9ed7944fbf6222aab20e26d55364c2f03df2493f5b856ff46f0c9e33c9929b00c76bd0d2135235c5a6880f2ad734a8bcea322965d7db8cbc25beaa3840463b7d0ab836fd5117351ea',
  },
  {
    id: 3,
    order: 1,
    title: 'Renomear 1',
    mediaType: MediaTypeEnum.Audio,
    transcriptionStatus: TranscriptionStatusEnum.Transcribed,
    url: 'https://storage.googleapis.com/reeducation-transcription-bucket/audios/291633b3-0fde-46e5-b566-21d71c028e82.mp3?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=poc-conta%40poc-brito.iam.gserviceaccount.com%2F20231021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231021T141317Z&X-Goog-Expires=432000&X-Goog-SignedHeaders=host&X-Goog-Signature=a7a51caa4bd019a040446695c8ebeb326cd8de4696cefa292089c6e29be3b3dffd0e8fa4f9de7f0e148cc749c32c859bf01cb6ff6cd44777f8b86b19ed86210802436cdb095024ec0709da0541d6bf99d48448e965a50fae4dd15746d27783f1aba8e178d88fee631369ba50c03a42581eaf3a9714fa3d0ace7c8dc160f5cf158cbdce558a8a59e7c9f0f1f7bd45f72264ebffa6ed2635a90a8dcc8d11991ffc20208ec96c279249d67314c9ef1e380ab3eb58f39073c8a9ed7944fbf6222aab20e26d55364c2f03df2493f5b856ff46f0c9e33c9929b00c76bd0d2135235c5a6880f2ad734a8bcea322965d7db8cbc25beaa3840463b7d0ab836fd5117351ea',
  },
  {
    id: 4,
    order: 2,
    title: 'De novo 2',
    mediaType: MediaTypeEnum.Video,
    transcriptionStatus: TranscriptionStatusEnum.AwaitingProcessing,
    url: 'https://storage.googleapis.com/reeducation-transcription-bucket/videos/8565b598-aa8b-494c-841a-03710b928ae1.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=poc-conta%40poc-brito.iam.gserviceaccount.com%2F20231021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231021T141317Z&X-Goog-Expires=432000&X-Goog-SignedHeaders=host&X-Goog-Signature=69e9a9f7498b126e0d920178e9313de379890c4802a5c1bd1852988357ff1d9fc9150008ca0c5990f237992290f3efe9dc9b4fb269343a0fda249f521e307ea6692f649fdc93531b4c5253bd73e81532427692b92205c196a1b31f4e00d93b1214a5750703d2f8a95a5315168597bd3c6a0f9f1d30bd007983ccbfa2370b2728392763b61a18d6231605c81ed9db52b83dadaa398039413df72990b71cb068d8466f8a7681b1c18694d655161c49a93e61567ca5c2f3a4e9e1f8717a7bf54a5c45af6917d57e9b5db14d11c43c5f96ba5ed1dfd7fe4d2abbf369e2a3e39b5d06cc51d9c9742888dc1c0e62f36e74ca426e60df4e560f85abb5c9eee45f76c253',
  },
  {
    id: 5,
    order: 3,
    title: 'Já sabe 3',
    mediaType: MediaTypeEnum.Video,
    transcriptionStatus: TranscriptionStatusEnum.AwaitingProcessing,
    url: 'https://storage.googleapis.com/reeducation-transcription-bucket/videos/8565b598-aa8b-494c-841a-03710b928ae1.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=poc-conta%40poc-brito.iam.gserviceaccount.com%2F20231021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231021T141317Z&X-Goog-Expires=432000&X-Goog-SignedHeaders=host&X-Goog-Signature=69e9a9f7498b126e0d920178e9313de379890c4802a5c1bd1852988357ff1d9fc9150008ca0c5990f237992290f3efe9dc9b4fb269343a0fda249f521e307ea6692f649fdc93531b4c5253bd73e81532427692b92205c196a1b31f4e00d93b1214a5750703d2f8a95a5315168597bd3c6a0f9f1d30bd007983ccbfa2370b2728392763b61a18d6231605c81ed9db52b83dadaa398039413df72990b71cb068d8466f8a7681b1c18694d655161c49a93e61567ca5c2f3a4e9e1f8717a7bf54a5c45af6917d57e9b5db14d11c43c5f96ba5ed1dfd7fe4d2abbf369e2a3e39b5d06cc51d9c9742888dc1c0e62f36e74ca426e60df4e560f85abb5c9eee45f76c253',
  },
];

export let groupMediaMock: GroupMedia[] = [
  {
    id: 1,
    transcriptionId: 1,
    title: 'Caso Nardoni',
    transcriptionStatus: TranscriptionStatusEnum.Transcribed,
    user: 'Brito Cabrito'
  },
  {
    id: 2,
    transcriptionId: 2,
    title: 'Goleiro Bruno',
    transcriptionStatus: TranscriptionStatusEnum.AwaitingProcessing,
    user: 'Jonathan Fera'
  },
];

export let groupMediaFull: GroupMedia[] = [
  {
    id: 1,
    transcriptionId: 1,
    title: 'Caso Nardoni',
    transcriptionStatus: TranscriptionStatusEnum.Transcribed,
    user: 'Brito Cabrito',
    medias: [mediasMock[0], mediasMock[1]],
    transcription: transcriptionsMock[0],
  },
  {
    id: 2,
    transcriptionId: 2,
    title: 'Goleiro Bruno',
    transcriptionStatus: TranscriptionStatusEnum.AwaitingProcessing,
    user: 'Jonathan Fera',
    medias: [mediasMock[2], mediasMock[3], mediasMock[4]],
  },
];
