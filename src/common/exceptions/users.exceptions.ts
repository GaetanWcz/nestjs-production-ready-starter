import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message: string = 'User not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
