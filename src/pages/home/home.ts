import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { ChatUser } from "../../app/app.models";
import { Observable } from "rxjs";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { ChatsPage } from "../chats/chats";
import { appconfig } from "../../app/app.config";
import {UserServiceProvider} from "../../services/user.service";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  //email: string;
  loginForm: any = {};
  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    private chatservice: ChatService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private userService: UserServiceProvider
  ) {}

  ngOnInit() {
    this.storage.get("chatuser").then(chatuser => {
      if (chatuser && chatuser.userId !== "") {
        this.navCtrl.push(ChatsPage);
      }
    });

    this.userService.currentUser$.subscribe(
      user =>{
        console.log("Loged In as user : ",user);
        if(!!user) {this.getUserChatDetails(user);}
      }
    )
  }

  getUserChatDetails(user){
    // this.db
    //   .collection<ChatUser>(appconfig.users_endpoint, ref => {
    //     return ref.where("userId", "==", user.id);
    //   })

      this.chatservice.getUser(user)
   //   .valueChanges()
      .subscribe(user => {

        if (!user) {
          console.error("User was not created ")
        }
        else {
          //User already exists, move to chats page
          this.storage.set("chatuser", user);

          let toast = this.toastCtrl.create({
            message: "Login In Successful " + user.name,
            duration: 3000,
            position: "top"
          });
          toast.present();
          this.navCtrl.push(ChatsPage);
        }
      });
  }



/*  loginUser() {

    if (this.loginForm.email != "") {
      //Check if email already exists
      let myLoader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      myLoader.present().then(() => {
        this.db
          .collection<User>(appconfig.users_endpoint, ref => {
            return ref.where("email", "==", this.loginForm.email);
          })
          .valueChanges()
          .subscribe(users => {
            console.log(users);

            if (users.length === 0) {
              //Register User

              //Add the timestamp
              this.loginForm.time = new Date().getTime();

              this.chatservice
                .addUser(this.loginForm)
                .then(res => {
                  //Registration successful, go to chats page
                  this.storage.set("chatuser", this.loginForm);
                  myLoader.dismiss();

                  let toast = this.toastCtrl.create({
                    message: "Login In Successful",
                    duration: 3000,
                    position: "top"
                  });
                  toast.present();

                  this.navCtrl.push(ChatsPage);
                })
                .catch(err => {
                  console.log(err);
                  myLoader.dismiss();
                });
            } else {
              //User already exists, move to chats page
              this.storage.set("chatuser", users[0]);

              let toast = this.toastCtrl.create({
                message: "Login In Successful",
                duration: 3000,
                position: "top"
              });
              toast.present();
              myLoader.dismiss();

              this.navCtrl.push(ChatsPage);
            }
          });
      });
    } else {
      let toast = this.toastCtrl.create({
        message: "Enter Email to log in",
        duration: 3000,
        position: "top"
      });
      toast.present();
    }
  }*/
}
