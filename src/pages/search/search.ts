import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { DetailsPage } from "../details/details"
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http/';

import 'rxjs/add/observable/of';


export interface Localisable{
  categorie: string;
  id: number;
  name: string;
  locationX: number;
  locationY: number;
  level: number;
}


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchInput') searchInput: Searchbar;

  results: Observable<Localisable[]>;
  pushPage: any;
  searchQuery: string;
  selectedLocalisable: string = "all";
  
  allLocalisablesExample: Localisable[] = allLocalisablesExample;
  equipementExample: Localisable[] = equipementExample;
  staffExample: Localisable[] = staffExample;


  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    this.searchQuery ;
    this.searchItems();
    this.pushPage = DetailsPage;
  }

  onSegmentChanged(segmentButton) {
    this.searchItems();
  }

  fetchResults(query: string): Observable<Localisable[]> {
    // FIXME : add real url prefix 
    let url: string = "/" + this.selectedLocalisable + '/get.php?name=' + query;
    console.log(url);
    let params = new HttpParams().set('name', query);
    return this.httpClient.get<Localisable[]>(url, { params });
    // switch (this.selectedLocalisable) {
    //   case "all":
    //     return Observable.of(allLocalisablesExample);
    //   case "equipement":
    //     return Observable.of(equipementExample);
    //   case "staff":
    //     return Observable.of(staffExample);
    //   default:
    //     // code...
    //     break;
    // }
  }

  searchItems(): void {
    if (this.searchQuery) {
      this.results = this.fetchResults(this.searchQuery);
    }
    else {
      this.results = Observable.of([]);
    }
  }

  onClick(loc:Localisable){
    this.navCtrl.push(this.pushPage, { resultParam: loc });
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.searchInput.setFocus();
    },150);

  }

}





/*
const allLocalisablesExample: Localisable[] = [
{
  categorie: "staff",
  id: 0,
  name: "Didier Donsez",
}, 
{
  categorie: "staff",
  id: 1,
  name: "Alan Turing",
},
{
  categorie: "staff",
  id: 2,
  name: "Richard Stallman",
},  
{
  categorie: "equipement",
  id: 0,
  name: "Torque wrench",
}, 
{
  categorie: "equipement",
  id: 1,
  name: "Hydrolic column drill",
},
{
  categorie: "equipement",
  id: 2,
  name: "Grease gun",
}
];
export const staffExample: Localisable[] = [
{
  categorie: "staff",
  id: 0,
  name: "Didier Donsez",
}, 
{
  categorie: "staff",
  id: 1,
  name: "Alan Turing",
},
{
  categorie: "staff",
  id: 2,
  name: "Richard Stallman",
},  
]; 
export const equipementExample: Localisable[] = [
{
  categorie: "equipement",
  id: 0,
  name: "Torque wrench",
}, 
{
  categorie: "equipement",
  id: 1,
  name: "Hydrolic column drill",
},
{
  categorie: "equipement",
  id: 2,
  name: "Grease gun",
}
];*/