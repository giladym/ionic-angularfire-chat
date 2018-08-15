
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {HttpUtil} from "./http.util";
import {UserDetailsModel} from "../models/user.model";
import {IGetDataRequest} from "../models/requests/get-params.model";
import {IServerResponse} from "../models/core/server-response.model";

// const USER = {
//   id: "asd",
//   name: "פולינה אטנסוב",
//   birthday:'28',
//   age: 28,
//   image:"assets/imgs/user-icon.png",
//   city:"חולון",
//   address:"חולון",
//   children: [{
//     gender: "girl",
//     name: "עדי",
//     birthDate: "2017-03-18"
//   }, {
//     gender: "boy",
//     name: "יונתן",
//     birthDate: "2017-06-20"
//   }, {
//     gender: "boy",
//     name: "אריאל",
//     birthDate: "2016-05-20"
//   }],
//   aboutUser: "שמי נטע, אמא ליונתן בן ה-8 חודשים ומאי בת ה4. נשואה לנועם. עוסקת בשיווק ונמצאת בחופשת לידה מאז לידתו של יונתן. החלטתי להאריך את חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.חופשת הלידה עד שיונתן יהיה בן שנה, כדי לקחת חלק פעיל ומרכזי יותר בשנתו הראשונה.",
//   userCategories: [
//     {
//       id: "c5",
//       name: "ספורט ותנועה"
//     },
//     {
//       id: "c6",
//       name: "טיפים וכלים להורים"
//     }
//   ],
//   usersPastActivities:[
//     {
//       id: "123456",
//       title: "מעגל אמהות מניקות",
//       image: "assets/imgs/mum-and-baby-yoga.jpg",
//       date: "2018-04-17T16:00:00",
//       address: "אהרונוביץ 12, הרצליה",
//       agent: "עדי כהן",
//     },
//     {
//       id: "456789",
//       title: "התעמלות וחיזוק הגוף לאחר לידה",
//       image: "assets/imgs/baby_swim_class.jpg",
//       date: "2018-02-21T16:00:00",
//       address: "אהרונוביץ 12, רחובות",
//       agent: "נינה רומנוב"
//     },
//     {
//       id: "123456",
//       title: "התעמלות לתינוקות",
//       image: "assets/imgs/mother-and-baby-classes-postnatal-exercise.jpg",
//       date: "2018-01-03T16:00:00",
//       address: "אהרונוביץ 12, הרצליה",
//       agent: "עדי כהן",
//     }
//   ],
//   userComments: [{
//     reviewText: "עברנו מספר חוגים לפני הסדנא הזו , עיסוי , תנועה וגם בייבי שיר, התלבטתי בכלל אם להגיע לסדנא הזו , ואני חייבת לומר שזה שונה מכל קורס אחר שעשיתי ושלמדתי המון בעיקר בתחום התנועה . היה דגש מאוד גדול על תנועה ומאוד נהניתי מכך , כל שבוע חיכיתי ליום חמישי ולזמן המיוחד הזה עם שוהם ושאר הבנות",
//     activityName: "סדנת יוגה לתינוקות",
//     activityAgent: "איריס בר נר",
//     activityAgentID: "123456",
//     activityDate: "2018-10-10T14:48:00"
//   }, {
//     reviewText: "היה דגש מאוד גדול על תנועה ומאוד נהניתי מכך , כל שבוע חיכיתי ליום חמישי ולזמן המיוחד הזה עם שוהם ושאר הבנות",
//     activityName: "ליווי התפתחותי",
//     activityAgent: "מעיין נרקיסי",
//     activityAgentID: "123456",
//     activityDate: "2018-10-10T14:48:00",
//     commentAnswer: {
//       commentText: "תודה על המילים החמות. היה לי תענוג לבלות איתך ועם שוהם. נתראה בפעילות הבאה!",
//       userName: "מעיין נרקיסי",
//       userId: "123456"
//     }
//   }],
//   images: [{
//     image: "assets/imgs/baby_swim_class.jpg",
//     title: "שחייה לתינוקות עם נגה נחליאלי",
//     number: 1,
//     total: 14
//   }, {
//     image: "assets/imgs/Baby_Yoga_zps5b60cdb5.jpg",
//     title: "שחייה לתינוקות עם נגה נחליאלי",
//     number: 2,
//     total: 14
//   }, {
//     image: "assets/imgs/baby_swim_class.jpg",
//     title: "שחייה לתינוקות עם נגה נחליאלי",
//     number: 3,
//     total: 14
//   }, {
//     image: "assets/imgs/Baby_Yoga_zps5b60cdb5.jpg",
//     title: "שחייה לתינוקות עם נגה נחליאלי",
//     number: 4,
//     total: 14
//   }]
// };

@Injectable()
export class UserServiceProvider extends HttpUtil{

  private _isAuthenticated: boolean = true;
  private _isUserHasDetails: boolean = true;

  public currentUser$: BehaviorSubject<UserDetailsModel> = new BehaviorSubject<UserDetailsModel>(null);

  constructor( public http: HttpClient) {
    super(http);
  }

  public isAuthenticated(){
    return this._isAuthenticated;
  }

  public isUserHasDetails(){
    return this._isUserHasDetails;
  }

  login(userId){
    // TODO implement login

    this._isAuthenticated = true;
    this._isUserHasDetails = true;

    const params: IGetDataRequest = {
      id: userId || '5b18f72084de31d525264000'//'5b18f72084de31d52526557f'
    };

    return this.getUserDetails(params).toPromise().then((result: IServerResponse<UserDetailsModel>) => {
      this.currentUser$.next(result.data);
    });
  }

  getUserDetails(params: IGetDataRequest): Observable<IServerResponse<UserDetailsModel>> {
    return this.get<IServerResponse<UserDetailsModel>>(HttpUtil.parseUrlKey('getUser'), null, params);
  }
/*
  getConnectedUsers(params: IUserFriendsRequest) : Observable<IServerResponse<UserBasicModel[]>> {
    return this.post<IServerResponse<Array<UserBasicModel>>>(HttpUtil.parseUrlKey('getConnectedUsers'), params);
  }

  getUserComments(params: IUserCommentsRequest): Observable<IServerResponse<Array<ReviewItemModel>>>{
    return this.post<IServerResponse<Array<ReviewItemModel>>>(HttpUtil.parseUrlKey('getUserComments'), params);
  }

  getUserActivities(params: IUserActivitiesRequest): Observable<IServerResponse<Array<ActivityDetailsModel&CanReviewed>>>{
    return this.post<IServerResponse<Array<ActivityDetailsModel&CanReviewed>>>(HttpUtil.parseUrlKey('getUserActivities'), params);
  }

  updateUserDetails(params: IUpdateUserDetailsRequest): Observable<IServerResponse<any>>{
    return this.put<IServerResponse<any>>(HttpUtil.parseUrlKey('updateUserDetails'), params);
  }

  getSearchUsers(): Observable<IServerResponse<Array<UserDetailsModel>>> {
    return this.get<IServerResponse<Array<UserDetailsModel>>>(HttpUtil.parseUrlKey('getSearchUsers'));
  }

  addActivityComment(params: IAddActivityCommentRequest): Observable<IServerResponse<any>> {
    return this.post<IServerResponse<any>>(HttpUtil.parseUrlKey('addActivityComment'), params);
  }

  // getUserPastActivities(params): Observable<Array<ActivityDetailsModel>>{
  //   return this.post(HttpUtil.parseUrlKey('getUserPastActivities', params), params);
  // }

  */
}
