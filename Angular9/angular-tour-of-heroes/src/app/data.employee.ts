export class Employee{
  username!: string | null;
  fullname!: string | null;
  password!: string | null;
  address!: string | null;
  age!: number | null;
}

export var lstEm: Employee[]=[
    {username:"username1", fullname:"name 1", password:"pass1", address:"address 1", age: 20},
    {username:"username2", fullname:"name 2", password:"pass2", address:"address 2", age: 21},
    {username:"username3", fullname:"name 3", password:"pass3", address:"address 3", age: 22},
    {username:"username4", fullname:"name 4", password:"pass4", address:"address 4", age: 23},
    {username:"username5", fullname:"name 5", password:"pass5", address:"address 5", age: 24},
    {username:"username6", fullname:"name 6", password:"pass6", address:"address 6", age: 25},
  ];