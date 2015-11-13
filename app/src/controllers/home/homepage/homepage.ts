import { Component, View, Inject, CORE_DIRECTIVES } from 'angular2/angular2';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Material } from '../../../directives/material';
import { Navigation as NavigationService } from '../../../services/navigation';
import { MindsTitle } from '../../../services/ux/title';

@Component({
  selector: 'minds-homepage',
  bindings: [ MindsTitle, NavigationService  ]
})
@View({
  templateUrl: 'src/controllers/home/homepage/homepage.html',
  directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, Material ]
})

export class Homepage {

  constructor(public title: MindsTitle, public navigation: NavigationService){
    this.title.setTitle("Home");
  }
}
