import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectComponent } from './components/project/project.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, data: { side: 'center' } },
	{ path: 'contact', component: ContactComponent, data: { side: 'left' } },
	{ path: 'portfolio', component: PortfolioComponent, data: { side: 'right' } },
	{ path: 'portfolio/:id', component: ProjectComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'about', component: AboutComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }