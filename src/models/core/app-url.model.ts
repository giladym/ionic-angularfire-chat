/**
 *  This model will handle the mapping of URL_Keys to a url model
 *  This model can be elaborated to include reach features that are need to this specific URL_KEY
 *  Dependencies: ENV
 */
import {ENV} from "@app/env";


const URL_PARAM_PREFIX = '{:';
const URL_PARAM_SUFFIX = '}';

export class AppUrlModel {

  /** is Simple String
   *  Detect is the String contains data to parse
   * @param {string} string
   * @param {Object} params
   * @returns {boolean}
   */
  private static isSimpleString(string:string, params:Object): boolean{
    return  !string.indexOf(URL_PARAM_PREFIX) || // If no params in string
      !Object.keys(params).length //if no params object to parse
  }

  /** parse
   *  Parse Url According to predefined prefix, suffix
   * @param {string} string
   * @param {Object} params
   * @returns {string}
   */
  private static parse(string:string, params:Object): string{
    let result = '';
    Object.keys(params).forEach(_key => {
      const keyString = URL_PARAM_PREFIX + _key + URL_PARAM_SUFFIX;
      result = string.split(keyString).join(params[_key]);
    });

    return result;
  }

  readonly url;

  constructor(urlKey:string, params?: Object){
    this.url = ENV.API_BASE + this.parseKeys(ENV.API_KEYS[urlKey],params);
    // Can be extended here:
    // Headers ....
    // Specific configurations ...
  }

  private parseKeys(string:string, params:Object = {}): string{
    return AppUrlModel.isSimpleString(string, params) ?
           string :
           AppUrlModel.parse(string, params)
  }

}
