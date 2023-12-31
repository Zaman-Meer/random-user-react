export interface UserFetchDataType {
  _id: string;
  name: string;
  sectors: string[];
  agree_to_terms: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSendDataType {
  name: string;
  sectors: string[];
  agree_to_terms: boolean;
}
