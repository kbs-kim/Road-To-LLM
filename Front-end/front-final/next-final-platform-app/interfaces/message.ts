export interface IMessage {
  member_id: number;
  name: string;
  profile: string;
  message: string;
  send_date: string;
}

export interface IChannelCreate {
  channel_name:  string;
  user_limit: number;
  channel_state_code: string;

}
