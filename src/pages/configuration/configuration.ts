import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ConfigurationAboutPage } from '../configuration-about/configuration-about';
import { SigninPage } from '../signin/signin';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  confsRef: AngularFireList<any>;
  conf: Observable<any[]>;
  usuario;
  tareas : Boolean;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  correo;
  foto;


  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public app: App, public database: AngularFireDatabase,private domSanitizer: DomSanitizer) {
    let user = this.authService.getCurrentUser();
      if(user != null){
        this.usuario = user.uid;
        this.correo = user.email;
        this.foto = this.domSanitizer.bypassSecurityTrustResourceUrl(user.photoURL);
      }
    this.confsRef = this.database.list('conf', ref => ref.orderByChild('usuario').equalTo(this.usuario));
    this.conf = this.confsRef.snapshotChanges()
    .map(changes => {
      if (changes === null) console.log("ERRORRRRRRRRRRRR");
      
      return changes.map(c => (
        { 
          key: c.payload.key, 
          ...c.payload.val() 
        }
      ));
    });

    this.myPhotosRef = firebase.storage().ref('/Photos/');

  }

  ionViewDidLoad(){
    
  }

  goToAbout(){
    this.navCtrl.push(ConfigurationAboutPage);
  }

  signOut() {
    this.authService.signOut();
    //this.navCtrl.setRoot(SigninPage);
    //this.events.publish('user:logout');
    this.app.getRootNav().setRoot(SigninPage);
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child(this.correo)
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        let user = this.authService.getCurrentUser();
        if(user != null){
          user.updateProfile({
            displayName: this.correo,
            photoURL: this.myPhotoURL
          });
        }
      });
    /*
    this.myPhotosRef.child(this.generateUUID()).child(this.correo)
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
      */
  }

  private generateUUID(): any {
    return this.usuario;
  }

  /*private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }*/
}
