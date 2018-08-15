import { LocationModel } from './common/location.model';
import { CategoryModel } from './common/category.model';
import { AddressModel } from './common/address.model';

export enum Gender {
  M = 'M',
  F = 'F'
}

export interface UserChildrenModel {
  gender:Gender;
  birthDate:string;
  name: string;
}

export interface UserBasicModel {
  id: string;
  firstName: string;
  lastName: string;
  location: LocationModel;
  imageUrl: string;
  children: UserChildrenModel[];
  address: AddressModel;
}

export interface UserDetailsModel extends UserBasicModel {
  phoneNumber: string;
  birthDate: string;
  categories: Array<CategoryModel>;
  description: string;
}

export enum PictureSourceType {
  PHOTOLIBRARY,
  CAMERA
}



