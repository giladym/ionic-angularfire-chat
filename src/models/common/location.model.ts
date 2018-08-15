import { AddressModel } from './address.model';
import { GeoLocationModel } from './geo-location.model';

export interface LocationModel{
  address: AddressModel;
  geoLocation: GeoLocationModel;
}
