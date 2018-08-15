import { IServerException } from './server-exception.model';
import { IPagingObjectRequest, IPagingObjectResponse } from 'models/common/paging-request.model';

export interface IServerResponse<T> {
  statusCode: number;
  innerCode: number;
  description: string;
  exception: IServerException;
  summary?: IPagingObjectResponse;
  // exception: any;
  data: T;
}
