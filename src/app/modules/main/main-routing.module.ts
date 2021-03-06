import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'overview', 
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      },
      {
        path: 'match',
        loadChildren: () => import('./match/match.module').then(m => m.MatchModule),
      },
      {
        path: 'people',
        loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule),
      },
      {
        path: 'referee',
        loadChildren: () => import('./referee/referee.module').then(m => m.RefereeModule),
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
