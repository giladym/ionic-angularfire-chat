import { ConfigCategoryModel } from './category.model';
import { AgeRangeModel } from './age-range.model';

export interface IConfig {
  categories: Array<ConfigCategoryModel>;
  ageRanges: Array<AgeRangeModel>
}
