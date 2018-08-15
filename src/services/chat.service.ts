import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, noop } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { ChatUser, Chat } from "app/app.models";
import { ENV } from "config/environment.dev";
import { map } from "rxjs/internal/operators";
import { firestore } from "firebase";

@Injectable()
export class ChatServiceProvider {

    private currUserDocId: string;    
    private users: AngularFirestoreCollection<ChatUser>;
    private chats: AngularFirestoreCollection<Chat>;

    constructor(private db: AngularFirestore) {
        //Get the tasks collecction
        this.users = db.collection<ChatUser>(ENV.firebase.users_colleaction);
        this.chats = db.collection<Chat>(ENV.firebase.chats_collection);
    }
  
    // TODO:: to implement see :  
    // https://github.com/angular/angularfire2/blob/master/docs/auth/getting-started.md
    // https://github.com/angular/angularfire2/commit/f2bfda9b33875f73e00f5ef87fb1ff6bb483972e
    public login(): void {

    }
    
    public getCurrUserChangesStream(userId){
        return this.getUserDoc(userId).switchMap(d => d.valueChanges());
    }

    public getUnreadChatsStream(userId){
            this.getCurrUserChangesStream(userId)
                .map(user => {
                      return Object.keys(user.pairsStatus)
                                   .reduce( (r, k) =>  r + Number(!!user.pairsStatus[k]) , 0);
                });
    }

    public getChatStream(pairKey){
      return this.queryChatStream(pairKey)
                    .valueChanges();  
    }

    public getUser(user){
        const userId = user.id ,
        name = user.firstName + ' ' + user.lastName;
     
        return this.getUserSnapshot({userId,name});
    }

    public addChat(chat: Chat): Promise<firestore.DocumentReference> {
        this.updateUsersPairKey(chat);
        return this.chats.add(chat);
    }

    private updateUsersPairKey(chat: Chat) {
        const pairKey = `pairsStatus.${chat.pair}`;
        const userDoc$ = this.updateUser(chat.sender, { [pairKey]: true });
        const partnerDoc$ = this.updateUser(chat.receiver, { [pairKey]: false });

        Observable.forkJoin(userDoc$,partnerDoc$)
        .subscribe(
            () => console.log(`Users [receiver: ${chat.receiver}, sender: ${chat.sender}] has been updated successfully`),
            // TODO :: add error handling (if needed here as well)
            err => console.error(`Users [receiver: ${chat.receiver}, sender: ${chat.sender}] has NOT been updated successfully`, err)
        );   
    }

    private queryUserStream(userId): Observable<{id: string, data: ChatUser}[]> {
        return this.db
            .collection<ChatUser>(ENV.firebase.users_colleaction, ref => {
            return ref.where("userId", "==", userId); // Select specific user
            })
        .snapshotChanges()
        .pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              /*
              Please note the NULL referance below:
                'By default, 
                FieldValue.serverTimestamp() values that have not yet been set to their final value will be returned as NULL. 
                You can override this by passing an options object.'
              */
              return {id:a.payload.doc.id,  data}
            }))
        );
    }

    private queryChatStream(pairKey){
      return  this.db
        .collection<Chat>(ENV.firebase.chats_collection, res => {
          return res.where("pair", "==", pairKey);
        })
    }

    private getUserSnapshot({userId,name}): Observable<{id: string, data: ChatUser}>{
        return this.queryUserStream(userId)
          .mergeMap((users) => {
            if(users.length == 0){
              //Register New User to FireStore DB
              const time = new Date().getTime();
              const user: ChatUser = {userId, name, time, pairsStatus: {}};
              return Observable.fromPromise(this.addUser(user))
                                .map( doc => ({ id: doc.id, data: user }) );    
            }

            // TODO:: update user if props has changed

            return Observable.of(users[0]);
          });
    }


    private getUserDoc(userId): Observable<AngularFirestoreDocument>{
      return this.queryUserStream(userId)
        .take(1)
        .map( users => users.length ? users[0].id : null )       
        .switchMap(userDocId => userDocId ? 
                    Observable.of(this.users.doc(userDocId)) :
                    Observable.fromPromise(this.addUser(userId))
                              .map(ref => new AngularFirestoreDocument(ref,this.db))
        );
    }

    private addUser(payload): Promise<firestore.DocumentReference> {
      return this.users.add(payload);
    }

    private updateUser(userId,payload): Observable<Promise<void>>{
      return this.getUserDoc(userId)
        .map(doc => {
            // TODO:: if no change - dont update
            // return noChangeFn() ?  new Promise(noop) : doc.update(payload)
            return doc.update(payload)
        });
    }

    private createPairKey(user1, user2): string {
        let pairId;
        return user1.time < user2.time ?
                `${user1.userId}|${user2.userId}` :
                `${user2.userId}|${user1.userId}` ;
    }

}
