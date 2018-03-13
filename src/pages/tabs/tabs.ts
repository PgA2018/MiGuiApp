import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { TaskPage } from '../task/task';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = HomePage;
  tab3Root = TaskPage;
  tab4Root = ConfigurationPage;

  constructor() {

  }
}
