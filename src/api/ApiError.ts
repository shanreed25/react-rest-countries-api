/*I need to record what kind of failure happened because the 
API can fail in different ways, and each one needs a different way to fix it
Since a plain error only has a message, to be able to get a status
so you can tell a 401 form a 400, creating a class that extends Error 
will keep everything the Error has and can add a status field
*/

export class ApiError extends Error {
  /*
  still the Error but with one extra field the status number
  */
  status: number;

  constructor(message: string, status: number) {//the error holds two things, the message and status
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}