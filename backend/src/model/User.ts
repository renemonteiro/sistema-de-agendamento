import { Email } from "../service/mailer";

export interface InputUser{
  id:string
  name:string
  nickname:string
  email:string
  type:string
  passEncryp:string
}

export interface InputWelcome{
  name:string
  nickname:string
  email:string
}

export interface AuthenticationData{
  id:string,
  type:string
}

export interface InputLogin{
  email:string,
  pass:string
}

export interface inputUpdateUser {
  id:string,
  name?:string,
  nickname?:string,
  email?:string,
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private type:string,
    private pass: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
  public getNickname(): string {
    return this.nickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPass(): string {
    return this.pass;
  }

  public getType(): string {
    return this.type;
  }
}
