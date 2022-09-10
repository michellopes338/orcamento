import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestUtil } from '../common/test/utils';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UsersController', () => {
  let usersController_test: UsersController;
  let usersService_test: UsersService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        User,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
          useFactory: jest.fn,
        },
      ],
    }).compile();

    usersController_test = module.get<UsersController>(UsersController);
    usersService_test = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
  });

  it('should be defined', () => {
    expect(usersController_test).toBeDefined();
  });

  describe('retornar usuario', () => {
    it('deve retornar o usuario pelo id', async () => {
      const result = TestUtil.giveMeAValidUser();

      mockRepository.findOne.mockReturnValue(result);

      const user = await usersController_test.findOne('1');

      expect(user).toEqual(result);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve dar erro por falta de usuario', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(usersController_test.findOne('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('cria usuario', () => {
    it('deve retornar um usuario', async () => {
      const user = TestUtil.giveMeAInsertUser();

      mockRepository.save.mockReturnValue(user);

      const usuario_salvo = await usersController_test.create(user);

      expect(usuario_salvo).toBe(user);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro interno', async () => {
      const erro = mockRepository.save.mockRejectedValue(
        new InternalServerErrorException(),
      );

      expect(erro).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });
});
