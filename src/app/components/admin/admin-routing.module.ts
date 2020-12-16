import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('../posts/list-post/list-post.module').then(
      //       (m) => m.ListPostModule
      //     ),
      // },
      {
        path: 'posts',
        loadChildren: () =>
          import('../posts/list-post/list-post.module').then(
            (m) => m.ListPostModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../admin/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
