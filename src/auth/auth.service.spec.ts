import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { authRegisterDTOMock } from '../testing/auth-register-dt0.mock';

describe('AuthService', () => {
  let autheService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    autheService = module.get<AuthService>(AuthService);
  });

  test('Validate definition', () => {
    expect(autheService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken method validation', () => {
      const result = autheService.createToken(userEntityList[0]);

      expect(result).toEqual({
        accessToken,
      });
    });

    test('verificartoken method validation', () => {
      const result = autheService.verificartoken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidaToken method validation', () => {
      const result = autheService.isValidaToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {
    test('login method validation', async () => {
      const result = await autheService.login('test@test.com', '123456');

      expect(result).toEqual({ accessToken });
    });

    test('forget method validation', async () => {
      const result = await autheService.forget('test@test.com');

      expect(result).toEqual(true);
    });

    test('reset method validation', async () => {
      const result = await autheService.reset('123456', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('register method validation', async () => {
      const result = await autheService.register(authRegisterDTOMock);

      expect(result).toEqual({ accessToken });
    });
  });
});
