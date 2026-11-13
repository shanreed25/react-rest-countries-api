/*
Since a plain error only has a message, to be able to get a status
so you can tell a 401 form a 400, creating a class that extends Error 
will keep everything the Error has and can add a status field
*/

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}