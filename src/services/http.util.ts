import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http/src/response";

import {AppUrlModel} from "../models/core/app-url.model";

export class HttpUtil {
  private headers;

  constructor(public http: HttpClient) {
    // this.headers = new HttpHeaders(ENV.headers);
  }

  /** parse Url Key
   *  Determine a specific Util we will use to hold Url data
   *
   * @param {string} text
   * @returns {any}
   */
  protected static parseUrlKey(urlKeys: string, params?: Object): AppUrlModel {
    return new AppUrlModel(urlKeys,params);
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public get<T>(
    urlParams: AppUrlModel,
    headers?: HttpHeaders | {    [header: string]: string | string[]  },
    params?: HttpParams | { [param: string]: string | string[] }
    ): Observable<T> {
    const options = {
      params,
      headers: headers || this.headers
    };

    return this.http.get<T>(urlParams.url, options);
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public post<T>(urlParams?: AppUrlModel, data?: any | null, options?: Object): Observable<T> {

    if (!options) {
      options = { headers: this.headers}
    }

    return this.http.post<T>(urlParams.url, data, options);
  }
  /**
   *
   * @param key
   * @returns {any}
   */
  public put<T>(urlParams: AppUrlModel, data: any | null, options?: Object): Observable<T> {
    return this.http.put<T>(urlParams.url,data, options);
  }
  /**
   *
   * @param key
   * @returns {any}
   */
  public delete<T>(urlParams: AppUrlModel, data: any | null, options?: Object): Observable<HttpEvent<T>> {
    return this.http.delete<T>(urlParams.url,data);
  }
}
