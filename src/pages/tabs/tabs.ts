import { Component } from '@angular/core';

import { MapsPage } from '../maps/contact';
import { HomePage } from '../home/home';
import { TaskPage } from '../task/task';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapsPage;
  tab2Root = HomePage;
  tab3Root = TaskPage;
  tab4Root = ConfigurationPage;

  constructor() {

  }
}
