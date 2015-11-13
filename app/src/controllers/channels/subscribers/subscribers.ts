import { Component, View, NgFor, NgIf, Inject, FORM_DIRECTIVES} from 'angular2/angular2';
import { Router, RouteParams } from 'angular2/router';
import { Client } from '../../../services/api';
import { Material } from '../../../directives/material';
import { SessionFactory } from '../../../services/session';
import { InfiniteScroll } from '../../../directives/infinite-scroll';
import { UserCard } from '../../../controllers/cards/cards';

@Component({
  selector: 'minds-channel-subscribers',
  viewBindings: [ Client ],
  properties: ['channel']
})
@View({
  templateUrl: 'src/controllers/channels/subscribers/subscribers.html',
  directives: [ NgFor, NgIf, Material, InfiniteScroll, UserCard ]
})

export class ChannelSubscribers {
  session = SessionFactory.build();

  guid : string;
  users : Array<any> = [];

  offset : string = "";
  moreData : boolean = true;
  inProgress : boolean = false;

  constructor(public client: Client){
  }

  set channel(value: any) {
    this.guid = value.guid;
    this.load();
  }

  load(){

    var self = this;
    this.inProgress = true;
    this.client.get('api/v1/subscribe/subscribers/' + this.guid, {})
      .then((response : any) => {
        console.log(response);
        if(response.status != "success"){
          return false;
        }

        if(self.offset){}
        for(let user of response.users){
          self.users.push(user);
        }

        self.offset = response['load-next'];
        self.inProgress = false;
      })
      .catch((e) => {
        console.log('couldnt load channel', e);
      });
  }

}
