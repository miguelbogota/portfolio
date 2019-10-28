import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectNewComponent } from './components/project/project-new/project-new.component';
import { ProjectViewComponent } from './components/project/project-view/project-view.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, data: { side: 'center' } },
	{ path: 'contact', component: ContactComponent, data: { side: 'left' } },
	{ path: 'portfolio', component: PortfolioComponent, data: { side: 'right' } },
	{ path: 'portfolio/:id', component: ProjectViewComponent },
	{ path: 'portfolio/:id/edit', component: ProjectEditComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'new', component: ProjectNewComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }