import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import {ChatUser, Chat, ChatPairStatus} from "./app.models";
import { appconfig } from "./app.config";
import {UserDetailsModel} from "../models/user.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { map } from 'rxjs/operators';
import * as firebase from "firebase";
import {Observable} from "rxjs/Rx";
import {ChatsPage} from "../pages/chats/chats";
import {switchMapTo, take} from "rxjs/internal/operators";
import {mergeMapTo} from "rxjs-compat/operator/mergeMapTo";
import {switchMap} from "rxjs-compat/operator/switchMap";

@Injectable()
export class ChatService {
  users: AngularFirestoreCollection<ChatUser>;
  private userDoc: AngularFirestoreDocument<ChatUser>;

  chats: AngularFirestoreCollection<Chat>;
  private chatDoc: AngularFirestoreDocument<Chat>;

  //The pair string for the two users currently chatting
  currentChatPairId;
  currentChatPartner;
  docIds : {[userId: string] : string} = {};

  public unreadMessages$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private db: AngularFirestore) {
    //Get the tasks collecction
    this.users = db.collection<ChatUser>(appconfig.users_endpoint);
    this.chats = db.collection<Chat>(appconfig.chats_endpoint);
  }

  getUser(user){
    const userId = user.id ,
      name = user.firstName + ' ' + user.lastName;
   // return this.users.doc(userId)
    return this.db
      .collection<ChatUser>(appconfig.users_endpoint, ref => {
        return ref.where("userId", "==", userId);
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          this.docIds[data.userId] = a.payload.doc.id;
          console.log(data);
          return data;

        }))
      ).mergeMap((users) => {
        if(users.length == 0){
          //Register User
          const time = new Date().getTime();
          const user: ChatUser = {userId, name, time, pairsStatus: {}};
          return Observable.fromPromise(this.addUser(user))
            .map(res => (user));
        }
        return Observable.of(users[0]);
      });
  }

  getUserDocId(userId){
    if(!!this.docIds[userId]){
      return Observable.of([this.docIds[userId]])
    }

    return this.db
      .collection<ChatUser>(appconfig.users_endpoint, ref => {
        return ref.where("userId", "==", userId);
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data.pairsStatus = data.pairsStatus || {};
          this.updateNumberOfUnreadMessages(data);

          const id = a.payload.doc.id;
          return id;
        })),
        take(1));
  }
  addUser(payload) {
    return this.users.add(payload);
  } //addUser

  updateNumberOfUnreadMessages(chatUser){
    const isMessage = Object.keys(chatUser.pairsStatus).reduce( (r, k) =>  r + Number(!!chatUser.pairsStatus[k]) , 0);
    this.unreadMessages$.next((isMessage));
  }

  addChat(chat: Chat) {
   //  const mapping = Observable.of({userDocId: 1 ,partnerDocId: 2 })
    const userDocId = this.getUserDocId(chat.sender);
    const partnerDocId = this.getUserDocId(chat.receiver);
    // Update partenr message unread
    partnerDocId.subscribe(arrId => {
      const pariKey = `pairsStatus.${chat.pair}`;
      console.log(arrId, pariKey);
      this.users.doc(arrId[0]).update({
        [pariKey]: true
      })
    });
    userDocId.subscribe(arrId => {
      const pariKey = `pairsStatus.${chat.pair}`;
      console.log(arrId, pariKey);
      this.users.doc(arrId[0]).update({
        [pariKey]: false
      })
    });

    /*
    const mapping = Observable.of({userDocId: 1 ,partnerDocId: 2 })
    const userDocId = this.getUserDocId(chat.sender);
    const partnerDocId = this.getUserDocId(chat.receiver);
    Observable.forkJoin([mapping,userDocId, partnerDocId])
      .subscribe(docIds => {
        console.log("ggg");
        const userDocId = docIds[docIds[0].userDocId];
        const partnerDocId = docIds[docIds[0].partnerDocId].toString();
        const pariKey = `pairsStatus.${chat.pair}`;
        //Set partner chat is not read
        this.users.doc(partnerDocId).update({
          pariKey: true
        })
      });*/

    return this.chats.add(chat);
  } //addChat

  createPairId(user1, user2) {
    let pairId;
    if (user1.time < user2.time) {
      pairId = `${user1.userId}|${user2.userId}`;
    } else {
      pairId = `${user2.userId}|${user1.userId}`;
    }

    return pairId;
  } //createPairString

  /* updateTask(id, update) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    this.taskDoc.update(update);
  } //updateTask

  deleteTask(id) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    //Delete the document
    this.taskDoc.delete();
  } //deleteTask */

}
