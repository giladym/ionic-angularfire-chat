export interface IPagingObjectRequest {
  skip: number;
  limit: number;
}

export interface IPagingObjectResponse extends IPagingObjectRequest {
  total: number;
}

export interface ICoordinates {
  long: number;
  lat: number;
}
