import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { UsersRepository } from '@/modules/users/users.repository';
import { UsersService } from '@/modules/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepositoryMock: Partial<UsersRepository>;
  let loggerMock: Partial<PinoLogger>;

  beforeEach(async () => {
    usersRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: usersRepositoryMock },
        { provide: PinoLogger, useValue: loggerMock },
        {
          provide: `PinoLogger:${UsersService.name}`,
          useValue: loggerMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      ];
      usersRepositoryMock.findAll = jest.fn().mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(usersRepositoryMock.findAll).toHaveBeenCalledWith([
        'id',
        'first_name',
        'last_name',
        'email',
      ]);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' };
      usersRepositoryMock.findById = jest.fn().mockResolvedValue(mockUser);

      const result = await service.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(usersRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should return undefined if user is not found', async () => {
      usersRepositoryMock.findById = jest.fn().mockResolvedValue(undefined);

      const result = await service.getUserById(1);
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const newUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'dummy',
      };
      usersRepositoryMock.insertOne = jest.fn().mockResolvedValue(newUser);

      const result = await service.createUser(newUser);
      expect(result).toEqual(newUser);
      expect(usersRepositoryMock.insertOne).toHaveBeenCalledWith(newUser, [
        'id',
        'first_name',
        'last_name',
        'email',
      ]);
    });
  });

  describe('updateUser', () => {
    it('should return true if user is updated', async () => {
      usersRepositoryMock.updateOne = jest.fn().mockResolvedValue(true);

      const result = await service.updateUser(1, { firstName: 'Jane' });
      expect(result).toBe(true);
      expect(usersRepositoryMock.updateOne).toHaveBeenCalledWith(1, { firstName: 'Jane' });
    });
  });

  describe('deleteUser', () => {
    it('should return true if user is deleted', async () => {
      usersRepositoryMock.deleteOne = jest.fn().mockResolvedValue(true);

      const result = await service.deleteUser(1);
      expect(result).toBe(true);
      expect(usersRepositoryMock.deleteOne).toHaveBeenCalledWith(1);
    });
  });
});
