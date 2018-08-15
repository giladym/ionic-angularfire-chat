export interface ChatPairStatus {
  [pairId: string]: number
}

export interface ChatUser {
  userId: string;
  name: string,
  time: number,
  pairsStatus: ChatPairStatus

}

export interface Chat {
  message: string;
  pair: string;
  sender: string;
  receiver: string;
  time: number;
}
