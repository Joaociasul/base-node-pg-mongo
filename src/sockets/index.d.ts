export declare enum Channels {
  MESSAGE_CHAT = "MESSAGE_CHAT",
}

export declare interface SocketMessage {
  readonly message: string;
  readonly date_time: Date;
  readonly viewed: boolean;
  readonly viewed_at: Date;
}

export declare class Socket {
  private readonly user_id: string | number;
  private readonly message: SocketMessage;
  private readonly channel: Channels;
  constructor(
    user_id: string | number,
    message: SocketMessage,
    channel: Channels
  );
}
