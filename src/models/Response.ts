export class Response<T>{
  public data: T;
  public message: string;
  public success: boolean;

  constructor(data: T, message: string, success: boolean) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
