import { User } from '../../users/entities/user.entity';

export class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.email = 'gabriel@gabriel.com';
    user.id = '1';

    return user;
  }

  static giveMeAInsertUser(): User {
    const user = new User();

    user.email = 'gabriel@gabriel.com';
    user.id = '1';
    user.password = 'senhaForte';
    user.is_superuser = false;

    return user;
  }
}
