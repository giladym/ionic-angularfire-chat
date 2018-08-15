import { SubCategoryModel } from './subcategory.model';

export interface CategoryModel {
  id: string;
  name: string;
  subCategories?: Array<SubCategoryModel>;
}

export interface ConfigCategoryModel extends CategoryModel{
  icon: string;
  iconChecked: string;
}
