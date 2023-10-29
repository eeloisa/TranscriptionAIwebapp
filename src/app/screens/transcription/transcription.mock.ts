import { Dialogue, Speaker, Transcription } from '../group-media/group-media.model';

export let dialoguesMock: Dialogue[] = [
  {
    id: 1,
    text: "Testando aqui um mock",
    startTime: 0,
    endTime: 10,
    order: 1,
    speaker: "Jonathan",
    mediaId: 1,
  },
  {
    id: 2,
    text: "ai sim heim galã",
    startTime: 11,
    endTime: 20,
    order: 2,
    speaker: "Britim",
    mediaId: 1,
  },
  {
    id: 3,
    text: "Terminaram ai piazada?",
    startTime: 0,
    endTime: 20,
    order: 1,
    speaker: "Felypson",
    mediaId: 2,
  },
  {
    id: 4,
    text: "Xiiiiii...",
    startTime: 21,
    endTime: 30,
    order: 2,
    speaker: "Britim",
    mediaId: 2,
  }
];

export let speakersMock: Speaker[] = [
  {
    name: "Jonathan",
    totalInSeconds: 300,
    mediaId: 1,
  },
  {
    name: "Britim",
    totalInSeconds: 24,
    mediaId: 1,
  },
  {
    name: "Felypson",
    totalInSeconds: 180,
    mediaId: 1,
  }
];

export let transcriptionsMock: Transcription[] = [
  {
    id: 1,
    summary: "Testando",
    subject: "Algum, Alguma coisa, Outro",
    categories: "Teste, Testado, Testudo, Testão",
    brazilianEntities: "Campão, DDS, Tereré",
    speakers: speakersMock,
    dialogues: dialoguesMock,
  }
];
