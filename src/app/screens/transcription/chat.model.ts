export class Chat {
  text: string;
  date: string;
  reply: boolean;
  user: ChatUser;
}

export class ChatUser {
  name: string;
  avatar: string;
}
