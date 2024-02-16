import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as Leaflet from 'leaflet';
import { UserService } from '../../service/user.service';
import { Response } from '../../interface/response.interface';
import { Coordinate } from '../../interface/coordinate.interface';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css'
})
export class UserdetailComponent implements OnInit {
  response: Response;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log('User ID:', params.get('uuid')!);
      this.userService.getUser(params.get('uuid')!).subscribe(
        (response: Response) => {
          console.log(response);
          this.response = response;
        }
      );
    });
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
    if (mode === 'edit') {
      // Logic to update the user on the back end
      console.log('Updating using on the back end');
    }
  }

  // private loadMap(coordinate: Coordinate): void {
  //   const map = Leaflet.map('map', {
  //     center: [coordinate.latitude, coordinate.longitude],
  //     zoom: 8
  //   });
  //   const mainLayer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     minZoom: 1,
  //     maxZoom: 30,
  //     crossOrigin: true,
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   });
  //   mainLayer.addTo(map);
  // }

}
