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
	{ path: '', component: HomeComponent, data: { side: 'main' } },
	{ path: 'contact', component: ContactComponent, data: { side: 'contact' } },
	{ path: 'portfolio', component: PortfolioComponent, data: { side: 'portfolio' } },
	{ path: 'portfolio/:id', component: ProjectViewComponent, data: { side: 'project' } },
	{ path: 'portfolio/:id/edit', component: ProjectEditComponent, data: { side: 'edit' } },
	{ path: 'admin', component: AdminComponent, data: { side: 'admin' } },
	{ path: 'about', component: AboutComponent, data: { side: 'about' } },
	{ path: 'new', component: ProjectNewComponent, data: { side: 'new' } }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }